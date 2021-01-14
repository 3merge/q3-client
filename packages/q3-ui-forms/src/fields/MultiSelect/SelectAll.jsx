import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControlLabel,
  Box,
  Checkbox,
  Divider,
} from '@material-ui/core';

const status = {
  checked: 'checked',
  unchecked: 'unchecked',
  indeterminate: 'indeterminate',
};

const SelectAll = ({ isChecked, setState }) => {
  return (
    <>
      <Box p={1}>
        <FormControlLabel
          control={
            <Checkbox
              indeterminate={
                isChecked === status.indeterminate
              }
              checked={isChecked === status.checked}
              onChange={(e) => {
                e.stopPropagation();
                if (isChecked === status.checked) {
                  setState(status.unchecked);
                } else {
                  setState(status.checked);
                }
              }}
              name="selectAll"
              color="primary"
            />
          }
          label="Select All"
        />
      </Box>
      <Divider />
    </>
  );
};

SelectAll.propTypes = {
  isChecked: PropTypes.oneOf([...Object.values(status)])
    .isRequired,
  setState: PropTypes.func.isRequired,
};

export default SelectAll;
