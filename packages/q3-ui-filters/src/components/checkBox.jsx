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

const FilterCheckBox = ({ label, name, op }) => {
  const { submitForm } = useFormikContext();
  const [{ value }, , { setValue }] = useField(name);
  const isChecked = extractTextualValue(value, false);

  return (
    <Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleOnChangeBoolean(
              setValue,
              op,
              submitForm,
            )}
            name={name}
          />
        }
        label={label}
      />
    </Box>
  );
};

FilterCheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  op: PropTypes.string.isRequired,
};

FilterCheckBox.defaultProps = {
  type: 'checkbox',
};

export default FilterCheckBox;
