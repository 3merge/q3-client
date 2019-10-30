import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Lock from '@material-ui/icons/Lock';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popper from '@material-ui/core/Popper';
import { connect, getIn } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
  styleProps,
  useFormikIntegration,
} from '../inputs';

Yup.addMethod(Yup.mixed, 'autocomplete', function() {
  return this.test(
    'nestedValue',
    'A selection is required',
    function(v) {
      const { createError } = this;
      return (
        (v && v.value && v.value !== '') || createError()
      );
    },
  );
});

const useStyles = makeStyles((theme) => ({
  container: {
    zIndex: theme.zIndex.modal + 200,
  },
  dropdown: {
    maxHeight: 215,
    overflow: 'auto',
  },
}));

export const DropDownMenu = ({
  isOpen,
  children,
  menuProps,
  style,
}) => {
  const { dropdown } = useStyles();
  return (
    <Paper elevation={2} {...menuProps} style={style}>
      {isOpen && (
        <List className={dropdown} dense>
          {children}
        </List>
      )}
    </Paper>
  );
};

DropDownMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  menuProps: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export const DropDownMenuItems = ({
  options,
  itemProps,
  selected,
}) =>
  options.map((item, i) => (
    <ListItem
      {...itemProps({ item })}
      key={item.value}
      className={selected === i ? 'Mui-selected' : null}
    >
      <ListItemText primary={item.label} />
    </ListItem>
  ));

DropDownMenuItems.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  itemProps: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
};

export const AutoCompleteField = (props) => {
  const { t } = useTranslation('labels');
  const inputProps = useFormikIntegration(props);
  const { readOnly, name, loading } = inputProps;

  // important to be uncontrolled
  delete inputProps.value;

  return (
    <TextField
      {...inputProps}
      {...styleProps}
      autoComplete={false}
      id="auto-suggest"
      label={t(name)}
      aria-busy={loading}
      InputProps={{
        autoComplete: 'auto-suggest',
        required: true,
        endAdornment: (
          <>
            {loading && (
              <CircularProgress
                size={16}
                aria-describedby="auto-suggest"
              />
            )}
            {readOnly && <Lock />}
          </>
        ),
      }}
    />
  );
};

AutoCompleteField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  inputProps: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
};

AutoCompleteField.defaultProps = {
  readOnly: false,
  loading: false,
  disabled: false,
};

export const AutoCompleteWrapper = ({
  loadOptions,
  formik,
  inputProps,
  innerRef,
}) => {
  const { container } = useStyles();
  const { name } = inputProps;
  const error = getIn(formik.errors, name);
  const term = getIn(formik.values, name) || {
    label: '',
    value: '',
  };

  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState(term);

  const onInputChange = React.useCallback((val) => {
    setSearchTerm(val);
    setLoading(true);
  }, []);

  const onChange = React.useCallback(
    (e) => formik.setFieldValue(name, e),
    [formik, name],
  );

  const onSearch = React.useCallback(() => {
    if (!loading) return;
    loadOptions(searchTerm)
      .catch(() => [])
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, [searchTerm, loading]);

  const onLoad = React.useCallback(
    () => (term ? onChange(term) : undefined),
    [term, onChange],
  );

  React.useEffect(() => {
    onSearch();
  }, [loading]);

  React.useEffect(() => {
    onLoad();
  }, []);

  return (
    <Downshift
      onInputValueChange={onInputChange}
      itemToString={(item) => (item ? item.label : '')}
      selectedItem={typeof term === 'object' ? term : null}
      onChange={onChange}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        highlightedIndex,
      }) => (
        <div>
          <AutoCompleteField
            error={error}
            loading={loading}
            disabled={formik.isSubmitting}
            inputProps={getInputProps()}
            formik={formik}
            {...inputProps}
          />
          <Popper
            anchorEl={innerRef.current}
            open={Boolean(isOpen && items.length)}
            className={container}
          >
            <DropDownMenu
              menuProps={getMenuProps(
                {},
                { suppressRefError: true },
              )}
              isOpen={Boolean(isOpen && items.length)}
              style={{
                marginTop: 8,
                width: innerRef.current
                  ? innerRef.current.clientWidth
                  : undefined,
              }}
            >
              <DropDownMenuItems
                options={items}
                itemProps={getItemProps}
                selected={highlightedIndex}
              />
            </DropDownMenu>
          </Popper>
        </div>
      )}
    </Downshift>
  );
};

AutoCompleteWrapper.propTypes = {
  loadOptions: PropTypes.func.isRequired,
  formik: PropTypes.shape({
    setFieldValue: PropTypes.func,
    values: PropTypes.object,
    errors: PropTypes.object,
    isSubmitting: PropTypes.bool,
  }).isRequired,
  inputProps: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string,
    readOnly: PropTypes.bool,
  }).isRequired,
};

const IntegratedAutoComplete = connect(AutoCompleteWrapper);

export default (props) => {
  const ref = React.createRef();

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <IntegratedAutoComplete innerRef={ref} {...props} />
    </div>
  );
};
