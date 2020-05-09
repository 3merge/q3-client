import React from 'react';

import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import DateBase from 'q3-ui-forms/lib/fields/DateBase';
import TextBase from 'q3-ui-forms/lib/fields/TextBase';
import SelectBase from 'q3-ui-forms/lib/fields/SelectBase';

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

  if (type === 'select') {
    return (
      <SelectBase
        id={name}
        value={realValue}
        onChange={handleOnChange(setValue, op)}
        items={options}
        name={name}
        label={label}
      />
    );
  }

  if (type === 'date')
    return (
      <DateBase
        {...rest}
        type="text"
        name={name}
        label={label}
        value={realValue}
        onChange={(e, v) => {
          setValue({
            operand: op,
            value: v,
          });

          submitForm();
        }}
      />
    );

  return (
    <TextBase
      {...rest}
      name={name}
      label={label}
      onChange={handleOnChange(setValue, op)}
      value={realValue}
      // onBlur={submitForm}
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
