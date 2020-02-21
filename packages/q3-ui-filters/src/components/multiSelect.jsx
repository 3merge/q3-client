import React from 'react';
import PropTypes from 'prop-types';
import { uniq, get } from 'lodash';
import { useField, useFormikContext } from 'formik';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import CollapsibleFieldLabel from 'q3-ui/lib/collapsibleFieldLabel';
import { array } from 'q3-ui-helpers';
import { extractTextualValue } from './utils';

export const addToOrFilterOut = (a, v, lever) =>
  lever
    ? uniq(a.concat(v))
    : a.filter((item) => item !== v);

export const flattenOptions = (a) =>
  a.map((o) => (typeof o === 'object' ? o.value : o));

export const MultiSelectCheckboxOption = ({
  label,
  value,
  options,
  op,
  next,
  done,
  prev,
}) => (
  <FormControlLabel
    style={{ display: 'block' }}
    label={label}
    control={
      <Checkbox
        checked={options.includes(value)}
        onChange={(e, status) => {
          const newValue = addToOrFilterOut(
            get(prev, 'value', []),
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
  prev: PropTypes.shape({
    value: PropTypes.array,
  }).isRequired,
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
  const extracted = array.is(
    extractTextualValue(value, []),
  );

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
              size="small"
              variant="outlined"
              color="primary"
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            fullWidth
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
      />
    );

  return Array.isArray(options) && options.length ? (
    <CollapsibleFieldLabel label={label}>
      {options.map((option) => (
        <MultiSelectCheckboxOption
          {...option}
          key={option.label}
          next={setValue}
          done={submitForm}
          options={extracted}
          prev={value}
          op={op}
        />
      ))}
    </CollapsibleFieldLabel>
  ) : null;
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
      PropTypes.number,
    ]),
  ),
};

FilterTextField.defaultProps = {
  options: [],
};

export default FilterTextField;
