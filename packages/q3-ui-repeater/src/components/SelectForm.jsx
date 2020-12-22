import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Box,
  FormControl,
  MenuItem,
  TextField,
} from '@material-ui/core';

const SortForm = ({
  options,
  label,
  value,
  handleChange,
}) => {
  const { t } = useTranslation();
  return (
    <TextField
      select
      label={label}
      size="small"
      margin="none"
      fullWidth
      variant="outlined"
      value={value}
      onChange={handleChange}
      inputProps={{
        name: t('by'),
        id: 'sort',
      }}
    >
      {options.map(({ label: key }, i) => (
        <MenuItem value={i} key={key} aria-label={key}>
          {t(key)}
        </MenuItem>
      ))}
    </TextField>
  );
};

SortForm.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      fn: PropTypes.func,
    }),
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default SortForm;
