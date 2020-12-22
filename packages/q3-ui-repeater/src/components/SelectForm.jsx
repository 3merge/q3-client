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
    <Box p={1.5} width={165}>
      <FormControl fullWidth>
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
      </FormControl>
    </Box>
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
};

export default SortForm;
