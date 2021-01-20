import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { array } from 'q3-ui-helpers';
import {
  Grid,
  MenuItem,
  TextField,
} from '@material-ui/core';

const SortForm = ({
  options,
  label,
  value,
  handleChange,
}) => {
  if (!array.hasLength(options)) return null;
  const { t } = useTranslation();

  return (
    <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
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
          <MenuItem
            value={i}
            key={key}
            aria-label={key}
            style={{
              fontSize: '1rem',
              margin: 0,
            }}
          >
            {t(key)}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
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
