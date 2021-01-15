import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControlLabel,
  Box,
  Checkbox,
  Divider,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export const STATUS = {
  CHECKED: 'checked',
  UNCHECKED: 'unchecked',
  INDETERMINATE: 'indeterminate',
};

const { CHECKED, UNCHECKED, INDETERMINATE } = STATUS;

const SelectAll = ({ status, setStatus }) => {
  const { t } = useTranslation('labels');

  const handleChange = () =>
    status === CHECKED
      ? setStatus(UNCHECKED)
      : setStatus(CHECKED);

  return (
    <>
      <Box pb={0.5} px={1}>
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
          label={t(
            status === CHECKED
              ? 'deselectAll'
              : 'selectAll',
          )}
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
  setStatus: PropTypes.func.isRequired,
};

export default SelectAll;
