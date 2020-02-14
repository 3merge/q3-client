import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import {
  extractTextualValue,
  handleOnChangeBoolean,
} from './utils';

const FilterCheckBox = ({ label, name, op, strict }) => {
  const { submitForm } = useFormikContext();
  const [{ value }, , { setValue }] = useField(name);
  const isChecked = extractTextualValue(value, false);

  let operand = op;
  if (strict && !value.value) operand = '=';

  const handleOnChangeEvent = handleOnChangeBoolean(
    setValue,
    operand,
    submitForm,
  );

  return (
    <Box>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleOnChangeEvent}
            name={name}
          />
        }
      />
    </Box>
  );
};

FilterCheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  op: PropTypes.oneOf(['*', '!*']).isRequired,
  strict: PropTypes.bool,
};

FilterCheckBox.defaultProps = {
  strict: false,
};

export default FilterCheckBox;
