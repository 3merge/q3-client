/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import QuantityField from './quantityField';
import AddToCartButton from './addToCartButton';

const AddToCart = ({ product, small }) => (
  <QuantityField small={small}>
    {(quantity) => (
      <AddToCartButton
        quantity={quantity}
        product={product}
        small={small}
      />
    )}
  </QuantityField>
);

AddToCart.propTypes = {
  product: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

AddToCart.defaultProps = {
  small: false,
};

export default AddToCart;
