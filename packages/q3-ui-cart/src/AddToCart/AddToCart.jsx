/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Quantity } from 'q3-components';
import Box from '@material-ui/core/Box';
import AddToCartButton from '../AddToCartButton';

const AddToCart = ({
  AddToCartButtonProps,
  product,
  size,
  disabled,
  ...rest
}) => (
  <Box display="flex" alignItems="stretch">
    <Quantity {...rest} disabled={disabled} size={size}>
      {(quantity) => (
        <AddToCartButton
          {...AddToCartButtonProps}
          disabled={disabled}
          quantity={quantity}
          product={product}
        />
      )}
    </Quantity>
  </Box>
);

AddToCart.propTypes = {
  // eslint-disable-next-line
  AddToCartButtonProps: PropTypes.object,
  product: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['large', 'regular', 'small']),
  disabled: PropTypes.bool,
};

AddToCart.defaultProps = {
  AddToCartButtonProps: {},
  size: 'large',
  disabled: false,
};

export default AddToCart;
