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
  inputLabel,
  options,
  by,
  handleChange,
}) => {
  const { t } = useTranslation();
  return (
    <Box p={1.5} width={165}>
      <FormControl fullWidth>
        <TextField
          select
          label={inputLabel}
          size="small"
          margin="none"
          fullWidth
          variant="outlined"
          value={by}
          onChange={handleChange}
          inputProps={{
            name: t('by'),
            id: 'sort',
          }}
        >
          {options.map(({ label }, i) => (
            <MenuItem
              value={i}
              key={label}
              aria-label={label}
            >
              {t(label)}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </Box>
  );
};

SortForm.propTypes = {
  inputLabel: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      fn: PropTypes.func,
    }),
  ).isRequired,
  by: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SortForm;
