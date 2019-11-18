import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as Yup from 'yup';
import { get } from 'lodash';
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

export const AutoCompleteWrapper = ({
  loadOptions,
  inputProps,
  formik,
  ...etc
}) => {
  const integrated = useFormikIntegration({
    ...etc,
    ...inputProps,
    formik,
  });
  const {
    readOnly,
    disabled,
    value,
    ...decoratedInputProps
  } = integrated;

  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState(
    get(value, 'value'),
  );

  const onInputChange = React.useCallback(({ target }) => {
    setSearchTerm(target.value);
    setLoading(true);
  }, []);

  const onChange = React.useCallback(
    (e, val) =>
      formik.setFieldValue(decoratedInputProps.name, val),
    [formik],
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

  React.useEffect(() => {
    onSearch();
  }, [loading]);

  return (
    <Autocomplete
      autoHighlight
      clearOnEscape
      freeSolo={false}
      onChange={onChange}
      options={items}
      loading={loading}
      disabled={disabled}
      readOnly={readOnly}
      getOptionLabel={(option) => option.label}
      defaultValue={value}
      renderInput={(params) => (
        <TextField
          {...params}
          {...decoratedInputProps}
          fullWidth
          variant="filled"
          aria-busy={loading}
          onChange={onInputChange}
          inputProps={{
            autocomplete: 'off',
            ...params.inputProps,
          }}
          InputProps={{
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress
                    color="inherit"
                    size={20}
                  />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
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

export default connect(AutoCompleteWrapper);
