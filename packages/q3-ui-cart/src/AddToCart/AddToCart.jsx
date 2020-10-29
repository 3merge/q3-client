/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Quantity } from 'q3-components';
import Box from '@material-ui/core/Box';
import AddToCartButton from '../AddToCartButton';

const AddToCart = ({ product, size, ...rest }) => (
  <Box display="flex" alignItems="stretch">
    <Quantity {...rest} size={size}>
      {(quantity) => (
        <AddToCartButton
          quantity={quantity}
          product={product}
        />
      )}
    </Quantity>
  </Box>
);

AddToCart.propTypes = {
  product: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['large', 'regular', 'small']),
};

AddToCart.defaultProps = {
  size: 'large',
};

export default AddToCart;
