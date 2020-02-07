import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useField, useFormikContext } from 'formik';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/NativeSelect';
import {
  extractTextualValue,
  handleOnChange,
} from './utils';

const FilterTextField = ({
  name,
  op,
  type,
  options,
  label,
  ...rest
}) => {
  const { submitForm } = useFormikContext();
  const [{ value }, , { setValue }] = useField(name);

  if (type === 'select')
    return (
      <Select
        fullWidth
        onChange={handleOnChange(setValue, op, submitForm)}
        label={label}
        name={name}
      >
        {options.map(({ value: v, label: l }) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </Select>
    );

  if (type === 'date')
    return (
      <KeyboardDatePicker
        {...rest}
        type="text"
        name={name}
        label={label}
        value={value || null}
        fullWidth
        onChange={(e, v) => {
          setValue({
            operand: op,
            value: v,
          });

          submitForm();
        }}
        placeholder="yyyy-mm-dd"
        format="YYYY-MM-DD"
        clearable
        autoOk
      />
    );

  return (
    <TextField
      {...rest}
      name={name}
      label={label}
      onChange={handleOnChange(setValue, op)}
      value={extractTextualValue(value)}
      onBlur={submitForm}
      style={{ marginBottom: '1rem' }}
      onKeyPress={(e) => {
        if (e.keyCode === 13) submitForm();
      }}
      margin="dense"
      fullWidth
    />
  );
};

FilterTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  op: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'text',
    'number',
    'date',
    'select',
  ]).isRequired,

  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

FilterTextField.defaultProps = {
  options: [],
};

export default FilterTextField;
