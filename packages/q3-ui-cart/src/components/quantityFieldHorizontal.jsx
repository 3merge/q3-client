/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import useStyle from './useStyle';
import useQuantity from './useQuantity';

const QuantityField = ({ children }) => {
  const { t } = useTranslation('labels');
  const { inputSmall } = useStyle();

  const {
    handleQuantity,
    hasError,
    quantity,
    reset,
  } = useQuantity();

  const styles = {
    inputProps: {
      className: inputSmall,
    },
    InputProps: {
      style: {
        paddingRight: 0,
      },
      endAdornment:
        typeof children === 'function'
          ? children(quantity)
          : children,
    },
  };

  return (
    <TextField
      type="number"
      variant="outlined"
      label={t('quickAdd')}
      onChange={handleQuantity}
      onBlur={reset}
      error={hasError}
      size="small"
      margin="dense"
      value={quantity}
      {...styles}
    />
  );
};

QuantityField.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
};

export default QuantityField;
