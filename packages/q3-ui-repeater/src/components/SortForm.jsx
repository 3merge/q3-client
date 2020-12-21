import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
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
        <InputLabel htmlFor="name-native-error">
          {t('sortBy')}
        </InputLabel>
        <NativeSelect
          fullWidth
          value={sortBy}
          onChange={handleChange}
          inputProps={{
            name: t('sortBy'),
            id: 'sort',
          }}
        >
          {sortOptions.map(({ sortBy: label }, i) => (
            <option
              value={i}
              key={label}
              aria-label={label}
            >
              {t(label)}
            </option>
          ))}
        </NativeSelect>
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
