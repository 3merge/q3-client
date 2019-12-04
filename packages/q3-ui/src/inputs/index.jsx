import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, getIn } from 'formik';
import { KeyboardDatePicker } from '@material-ui/pickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Lock from '@material-ui/icons/Lock';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import { red, grey } from '@material-ui/core/colors';
import KeyboardDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardUp from '@material-ui/icons/KeyboardArrowUp';
import ChipInput from 'material-ui-chip-input';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  error: {
    color: red[500],
  },
  normal: {
    color: grey[500],
  },
  control: {
    lineHeight: 1.2,
    '& strong': {
      display: 'block',
    },
  },
  selectable: {
    display: 'flex',
    cursor: 'pointer',
    userSelect: 'none',
  },
}));

export const styleProps = {
  variant: 'filled',
  fullWidth: true,
  margin: 'dense',
  disableUnderline: true,
};

export const useFormikIntegration = ({
  disabled,
  name,
  formik,
  readOnly,
  required,
  authFn,
  ...rest
}) => {
  const { t } = useTranslation();

  if (!formik) {
    throw new Error('Requires formik bag');
  }

  const error = getIn(formik.errors, name);
  const value = getIn(formik.values, name) || '';
  const label = t(`labels:${name}`);
  let helperText = t(`helpers:${name}`);

  if (error) {
    helperText = error;
  } else if (helperText.localeCompare(name) === 0) {
    helperText = null;
  }

  const onChange = React.useCallback((e) => {
    formik.setFieldValue(
      name,
      e.target ? e.target.value : e,
    );
  }, []);

  const overrides =
    typeof authFn === 'function'
      ? authFn({
          op: rest.isNew ? 'Create' : 'Update',
          name,
        })
      : {};

  return {
    ...rest,
    id: name,
    disabled: formik.isSubmitting || disabled,
    label,
    helperText,
    value,
    error,
    onChange,
    name,
    required,
    ...overrides,
  };
};

const IntegratedTextField = ({
  type,
  autoFocus,
  ...rest
}) => (
  <TextField
    {...useFormikIntegration(rest)}
    {...styleProps}
    autoFocus={autoFocus}
    type={type}
    InputProps={{
      ...(rest.readOnly && {
        endAdornment: <Lock />,
      }),
    }}
  />
);

const formikProps = PropTypes.shape({
  isSubmitting: PropTypes.bool,
  values: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
});

IntegratedTextField.propTypes = {
  name: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  formik: formikProps.isRequired,
  autoFocus: PropTypes.bool,
};

IntegratedTextField.defaultProps = {
  label: '',
  readOnly: false,
  type: 'text',
  autoFocus: false,
};

const MenuProps = {
  PaperProps: {
    elevation: 3,
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const IntegratedSelect = ({ options, ...rest }) => {
  const {
    id,
    name,
    label,
    helperText,
    value,
    ...props
  } = useFormikIntegration(rest);

  const { t } = useTranslation();
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const matchWithOptions = (v) => {
    const match = items.find(({ value: c }) => c === v);
    return match ? match.label : v;
  };

  const renderValueFromSelectOptions = (selected) => {
    if (typeof selected === 'object' && 'label' in selected)
      return selected.label;

    if (Array.isArray(selected))
      return selected
        .map((v) =>
          typeof v === 'object'
            ? v.label
            : matchWithOptions(v),
        )
        .join(', ');

    return matchWithOptions(selected);
  };

  if (!options || !options.length) {
    props.disabled = true;
  }

  React.useEffect(() => {
    if (Array.isArray(options)) {
      setItems(options);
      setLoading(false);
    } else {
      Promise.resolve(options)
        .then(setItems)
        .finally(setLoading);
    }
  }, [options]);

  return (
    <FormControl value={value} {...props} {...styleProps}>
      <InputLabel htmlFor={name} {...styleProps}>
        {label}
      </InputLabel>
      <Select
        {...props}
        isClearable
        MenuProps={MenuProps}
        renderValue={renderValueFromSelectOptions}
        input={
          <FilledInput
            id={id}
            name={name}
            value={value}
            endAdornment={
              loading && (
                <CircularProgress
                  size={18}
                  style={{ marginRight: 15 }}
                />
              )
            }
          />
        }
      >
        <MenuItem dense>--</MenuItem>
        {items.map((obj) => (
          <MenuItem dense key={obj.value} value={obj.value}>
            {t(obj.label)}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

IntegratedSelect.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  formik: formikProps.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

IntegratedSelect.defaultProps = {
  disabled: false,
  options: [],
};

const IntegratedDatePicker = (props) => {
  const { onChange, value, ...rest } = useFormikIntegration(
    props,
  );
  const intercept = (newValue) =>
    onChange({
      target: {
        value: newValue,
      },
    });

  return (
    <KeyboardDatePicker
      {...rest}
      {...styleProps}
      inputVariant="filled"
      value={value || null}
      onChange={intercept}
      placeholder="yyyy/mm/dd"
      format="YYYY/MM/DD"
      clearable
      autoOk
    />
  );
};

const IntegratedCheckbox = (props) => {
  const {
    label,
    helperText,
    onChange,
    ...rest
  } = useFormikIntegration(props);
  const { control, error, normal } = useStyles();

  const renderLabel = () => (
    <Typography variant="subtitle1" className={control}>
      <strong>{label}</strong>
      <small className={rest.error ? error : normal}>
        {helperText}
      </small>
    </Typography>
  );

  return (
    <Box my={2}>
      <FormControlLabel
        label={renderLabel()}
        control={
          <Switch
            {...rest}
            checked={Boolean(rest.value)}
            onChange={(e, val) => onChange(val)}
          />
        }
      />
    </Box>
  );
};

IntegratedCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  isPublic: PropTypes.bool,
  label: PropTypes.string,
  formik: PropTypes.shape({
    isSubmitting: PropTypes.bool,
    values: PropTypes.shape({
      resource: PropTypes.string,
    }),
  }).isRequired,
};

IntegratedCheckbox.defaultProps = {
  label: '',
  isPublic: false,
};

const CollapseableFieldset = ({
  label,
  error,
  helperText,
  children,
}) => {
  const { selectable } = useStyles();
  const [show, setShow] = React.useState(true);
  const toggle = () => setShow(!show);

  return (
    <Box my={2}>
      <FormControl component="fieldset">
        <FormLabel
          className={selectable}
          component="legend"
          onClick={toggle}
          tabIndex={0}
        >
          {show ? <KeyboardUp /> : <KeyboardDown />}
          <Typography component="span" variant="body2">
            {label}
          </Typography>
        </FormLabel>
        <Collapse in={show}>{children}</Collapse>
        {helperText && (
          <FormHelperText error={error}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

CollapseableFieldset.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
};

CollapseableFieldset.defaultProps = {
  error: false,
  helperText: null,
};

const IntegrationRadioFields = (props) => {
  const {
    label,
    helperText,
    error,
    options,
    ...rest
  } = useFormikIntegration(props);
  const { t } = useTranslation('labels');

  return Array.isArray(options) && options.length ? (
    <CollapseableFieldset
      label={label}
      error={error}
      helperText={helperText}
    >
      <RadioGroup aria-label={label} {...rest}>
        {options.map((option) => (
          <FormControlLabel
            control={
              <Radio
                disabled={rest.disabled}
                readOnly={rest.readOnly}
              />
            }
            name={option.label}
            label={t(option.label)}
            key={option.value}
            value={option.value}
          />
        ))}
      </RadioGroup>
    </CollapseableFieldset>
  ) : null;
};

const IntegrationCheckboxFields = (props) => {
  const {
    label,
    helperText,
    error,
    options,
    ...rest
  } = useFormikIntegration(props);
  const { t } = useTranslation('labels');

  const pushToState = (e, v) => {
    const item = e.target.value;
    const {
      name,
      formik: { values, setFieldValue },
    } = props;

    const prevItems = values[name] || [];
    const newItems = v
      ? prevItems.concat(item)
      : prevItems.filter((i) => i !== item);

    setFieldValue(name, newItems);
  };

  return Array.isArray(options) && options.length ? (
    <CollapseableFieldset
      label={label}
      error={error}
      helperText={helperText}
    >
      {options.map((option) => (
        <FormControlLabel
          control={
            <Checkbox
              {...rest}
              name={option.label}
              value={option.value}
              onChange={pushToState}
            />
          }
          label={t(option.label)}
          key={option.value}
          style={{ display: 'block' }}
        />
      ))}
    </CollapseableFieldset>
  ) : null;
};

const IntegratedMultiText = (props) => {
  const rest = useFormikIntegration(props);
  const pushToState = (chip) => {
    const {
      name,
      formik: { values, setFieldValue },
    } = props;

    const prevItems = values[name] || [];
    const newItems = chip
      ? prevItems.concat(chip)
      : prevItems.filter((i) => i !== chip);

    setFieldValue(name, newItems);
  };

  const removeFromState = (chip) => {
    const {
      name,
      formik: { values, setFieldValue },
    } = props;

    const prevItems = values[name] || [];
    setFieldValue(
      name,
      prevItems.filter((i) => i !== chip),
    );
  };

  return (
    <ChipInput
      {...rest}
      onAdd={pushToState}
      onDelete={removeFromState}
     {...styleProps}
    />
  );
};

export default connect(IntegratedTextField);
export const DesktopSelect = connect(IntegratedSelect);
export const DateSelect = connect(IntegratedDatePicker);
export const Check = connect(IntegratedCheckbox);
export const RadioSet = connect(IntegrationRadioFields);
export const CheckSet = connect(IntegrationCheckboxFields);
export const Multitext = connect(IntegratedMultiText);
