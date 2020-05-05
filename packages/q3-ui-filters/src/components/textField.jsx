import React from 'react';

import PropTypes from 'prop-types';
import { DatePicker } from '@material-ui/pickers';
import { useField, useFormikContext } from 'formik';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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
  const realValue = extractTextualValue(value, '');

  if (type === 'select')
    return (
      <FormControl variant="filled" size="small" fullWidth>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Select
          fullWidth
          id={name}
          value={realValue}
          native
          onChange={handleOnChange(
            setValue,
            op,
            submitForm,
          )}
          name={name}
        >
          <option value="" aria-label="Empty" />
          {options.map(({ value: v, label: l }) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </Select>
      </FormControl>
    );

  if (type === 'date')
    return (
      <DatePicker
        {...rest}
        type="text"
        size="small"
        name={name}
        label={label}
        value={
          realValue && realValue.length ? realValue : null
        }
        fullWidth
        onChange={(e, v) => {
          setValue({
            operand: op,
            value: v,
          });

          submitForm();
        }}
        inputVariant="filled"
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
      variant="filled"
      size="small"
      onChange={handleOnChange(setValue, op)}
      value={realValue}
      onBlur={submitForm}
      inputProps={{
        onKeyPress: (e) => {
          const charCode =
            typeof e.which === 'number'
              ? e.which
              : e.keyCode;
          if (charCode === 13) submitForm();
        },
      }}
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
