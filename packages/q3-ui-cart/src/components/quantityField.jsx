/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyle from './useStyle';
import useQuantity from './useQuantity';

const QuantityFieldWrapper = ({
  renderLeft,
  renderRight,
}) => (
  <Grid container spacing={1} component="form">
    <Grid item sm={4} xs={12}>
      {renderLeft}
    </Grid>
    <Grid item sm={8} xs={12}>
      {renderRight}
    </Grid>
  </Grid>
);

QuantityFieldWrapper.propTypes = {
  renderLeft: PropTypes.node.isRequired,
  renderRight: PropTypes.node.isRequired,
};

const Adornment = ({ increase, decrease }) => {
  const { top, bottom, float } = useStyle();
  const { t } = useTranslation('labels');

  return (
    <InputAdornment>
      <div className={float}>
        <IconButton
          className={top}
          aria-label={t('add')}
          onClick={increase}
        >
          <Add />
        </IconButton>
        <IconButton
          className={bottom}
          aria-label={t('subtract')}
          onClick={decrease}
        >
          <Remove />
        </IconButton>
      </div>
    </InputAdornment>
  );
};

Adornment.propTypes = {
  decrease: PropTypes.func.isRequired,
  increase: PropTypes.func.isRequired,
};

const QuantityField = ({ children, small }) => {
  const { t } = useTranslation('labels');
  const { input } = useStyle();

  const {
    decrease,
    handleQuantity,
    hasError,
    increase,
    message,
    quantity,
    reset,
  } = useQuantity();

  const textFieldProps = !small
    ? {
        inputProps: {
          className: input,
        },
        InputProps: {
          endAdornment: (
            <Adornment
              increase={increase}
              decrease={decrease}
            />
          ),
        },
      }
    : {};

  return (
    <QuantityFieldWrapper
      renderRight={
        typeof children === 'function'
          ? children(quantity)
          : children
      }
      renderLeft={
        <TextField
          fullWidth
          label={t('quantity')}
          color="secondary"
          type="number"
          variant="outlined"
          onChange={handleQuantity}
          onBlur={reset}
          error={hasError}
          helperText={message}
          value={quantity}
          size={small ? 'small' : null}
          {...textFieldProps}
        />
      }
    />
  );
};

QuantityField.propTypes = {
  children: PropTypes.func.isRequired,
  small: PropTypes.bool,
};

QuantityField.defaultProps = {
  small: false,
};

export default QuantityField;
