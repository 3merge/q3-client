import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Box,
  FormControl,
  MenuItem,
  InputLabel,
  NativeSelect,
  TextField,
  Select,
} from '@material-ui/core';

const SortForm = ({
  sortOptions,
  sortBy,
  handleChange,
}) => {
  const { t } = useTranslation();
  return (
    <Box p={1.5} width={165}>
      <FormControl fullWidth>
        {/* <InputLabel htmlFor="name-native-error">
          {t('sortBy')}
        </InputLabel> */}
        <TextField
          select
          size="small"
          margin="none"
          fullWidth
          variant="outlined"
          value={sortBy}
          onChange={handleChange}
          inputProps={{
            name: t('sortBy'),
            id: 'sort',
          }}
        >
          {sortOptions.map(({ sortBy: label }, i) => (
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
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      sortBy: PropTypes.string.isRequired,
      fn: PropTypes.func,
    }),
  ).isRequired,
  sortBy: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SortForm;
