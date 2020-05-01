import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyle, {
  REGULAR,
  LARGE,
  SMALL,
  STACKED,
  SPREAD,
} from './useStyle';
import useQuantity from './useQuantity';

const Quantity = ({
  size,
  variant,
  minimum,
  onMinimum,
  onQuantityChange,
  defaultValue,
  children,
  ...rest
}) => {
  const { t } = useTranslation('labels');
  const { input, text, top, bottom, float } = useStyle({
    size,
    variant,
  });

  const {
    decrease,
    handleQuantity,
    hasError,
    increase,
    message,
    quantity,
    reset,
  } = useQuantity({
    minimum,
    defaultValue,
    onMinimum,
    onQuantityChange,
  });

  const isStacked = variant === STACKED;

  const renderDecreaseInput = () => (
    <IconButton
      className={bottom}
      aria-label={t('subtract')}
      onClick={decrease}
      tabIndex={-1}
    >
      <Remove />
    </IconButton>
  );

  const renderIncreaseInput = () => (
    <IconButton
      className={top}
      aria-label={t('add')}
      onClick={increase}
      tabIndex={-1}
    >
      <Add />
    </IconButton>
  );

  const withAdornment = (El) => (
    <InputAdornment className={float}>
      <El />
    </InputAdornment>
  );

  const styles = {
    inputProps: {
      className: input,
      'aria-label': t('quantity'),
    },
    InputProps: {
      startAdornment: !isStacked
        ? withAdornment(renderDecreaseInput)
        : null,
      endAdornment: withAdornment(() => (
        <>
          {renderIncreaseInput()}
          {isStacked && renderDecreaseInput()}
        </>
      )),
    },
  };

  return (
    <>
      <TextField
        color="secondary"
        type="number"
        variant="outlined"
        className={text}
        onChange={handleQuantity}
        onBlur={reset}
        helperText={message}
        error={hasError}
        value={quantity}
        {...styles}
        {...rest}
      />

      {children ? children(quantity, reset) : null}
    </>
  );
};

Quantity.defaultProps = {
  children: null,
  defaultValue: 1,
  minimum: 0,
  onMinimum: null,
  onQuantityChange: null,
  size: 'regular',
  variant: 'stacked',
};

Quantity.propTypes = {
  /**
   * Render a child element and pass along the quantity value and reset function.
   */
  children: PropTypes.func,
  /**
   * Initial value of the input.
   */
  defaultValue: PropTypes.number,

  /**
   * Number the quantity cannot go below.
   */
  minimum: PropTypes.number,

  /**
   * A function that's invoked if the quantity minimum is met.
   * By default this occurs on 0.
   */
  onMinimum: PropTypes.func,
  /**
   * A function that's invoked if the quantity is changed by clicking.
   * Otherwise, trying passing in an onBlur handler.
   */
  onQuantityChange: PropTypes.func,
  /**
   * Controls the height and padding of the input.
   */
  size: PropTypes.oneOf([SMALL, REGULAR, LARGE]),

  /**
   * Controls how the up/down buttons display.
   */
  variant: PropTypes.oneOf([STACKED, SPREAD]),
};

export default Quantity;
