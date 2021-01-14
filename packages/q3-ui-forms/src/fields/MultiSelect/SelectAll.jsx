import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControlLabel,
  Box,
  Checkbox,
  Divider,
} from '@material-ui/core';
import { STATUS } from '../helpers';

const { CHECKED, UNCHECKED, INDETERMINATE } = STATUS;

const SelectAll = ({ status, setState }) => {
  const handleChange = () =>
    status === CHECKED
      ? setState(UNCHECKED)
      : setState(CHECKED);

  return (
    <>
      <Box p={1}>
        <FormControlLabel
          control={
            <Checkbox
              indeterminate={status === INDETERMINATE}
              checked={status === CHECKED}
              onChange={handleChange}
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
  status: PropTypes.oneOf([
    CHECKED,
    UNCHECKED,
    INDETERMINATE,
  ]).isRequired,
  setState: PropTypes.func.isRequired,
};

export default SelectAll;
