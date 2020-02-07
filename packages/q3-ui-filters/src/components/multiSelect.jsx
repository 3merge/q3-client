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

const FilterTextField = ({
  name,
  op,
  type,
  options,
  label,
  ...rest
}) => {
  const [{ value }, , { setValue }] = useField(name);
  const { submitForm } = useFormikContext();
  const extracted = isArray(extractTextualValue(value, []));

  if (type === 'chips')
    return (
      <Autocomplete
        {...rest}
        multiple
        filterSelectedOptions
        defaultValue={extracted}
        value={extractTextualValue(value, [])}
        onChange={(e, v) => {
          setValue({
            value: v,
            operand: op,
          });

          submitForm();
        }}
        options={options.map((o) =>
          typeof o === 'object' ? o.value : o,
        )}
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
              disableUnderline: true,
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
        {options.map(({ value: v, label: l }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={extracted.includes(v)}
                onChange={(e, status) => {
                  const oldValue = extracted;

                  const newValue = status
                    ? oldValue.concat(v)
                    : oldValue.filter((item) => item !== v);

                  setValue({
                    value: newValue,
                    operand: op,
                  });

                  submitForm();
                }}
              />
            }
            label={l}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

FilterTextField.propTypes = {
  name: PropTypes.string.isRequired,
  op: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'text',
    'number',
    'date',
    'select',
    'checkboxGroup',
  ]).isRequired,
};

FilterTextField.defaultProps = {
  options: [],
};

export default FilterTextField;
