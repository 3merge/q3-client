import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import { extractTextualValue, isArray } from './utils';

export const addToOrFilterOut = (a, v, lever) =>
  lever ? a.concat(v) : a.filter((item) => item !== v);

export const flattenOptions = (a) =>
  a.map((o) => (typeof o === 'object' ? o.value : o));

const MultiSelectCheckboxOption = ({
  label,
  value,
  options,
  op,
  next,
  done,
}) => (
  <FormControlLabel
    label={label}
    control={
      <Checkbox
        checked={options.includes(value)}
        onChange={(e, status) => {
          const oldValue = value;
          const newValue = addToOrFilterOut(
            oldValue,
            value,
            status,
          );

          next({
            value: newValue,
            operand: op,
          });

          done();
        }}
      />
    }
  />
);

MultiSelectCheckboxOption.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  op: PropTypes.string.isRequired,
  next: PropTypes.func.isRequired,
  done: PropTypes.func.isRequired,
};

MultiSelectCheckboxOption.defaultProps = {
  options: [],
};

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
  const extracted = isArray(extractTextualValue(value, []));

  const handleOnChange = (e, v) => {
    setValue({
      value: v,
      operand: op,
    });

    submitForm();
  };

  if (type === 'chips')
    return (
      <Autocomplete
        {...rest}
        multiple
        filterSelectedOptions
        options={flattenOptions(options)}
        defaultValue={extracted}
        value={extracted}
        onChange={handleOnChange}
        renderTags={(values, getTagProps) =>
          values.map((option, index) => (
            <Chip
              label={option}
              disabled={index === 0}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={name}
            fullWidth
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
      />
    );

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {options.map((option) => (
          <MultiSelectCheckboxOption
            {...option}
            next={setValue}
            done={submitForm}
            options={extracted}
            op={op}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

FilterTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  op: PropTypes.oneOf(['[]', '![]']).isRequired,

  type: PropTypes.oneOf(['chips', 'checkboxGroup'])
    .isRequired,

  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
  ),
};

FilterTextField.defaultProps = {
  options: [],
};

export default FilterTextField;
