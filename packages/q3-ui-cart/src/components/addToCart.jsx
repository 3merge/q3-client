/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import QuantityField from './quantityField';
import AddToCartButton from './addToCartButton';

const AddToCart = ({ product }) => (
  <QuantityField>
    {(quantity) => (
      <AddToCartButton
        quantity={quantity}
        product={product}
      />
    )}
  </QuantityField>
);

AddToCart.propTypes = {
  product: PropTypes.string.isRequired,
};

export default AddToCart;
