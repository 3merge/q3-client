/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import QuantityField from './quantityFieldHorizontal';
import AddToCartIconButton from './addToCartIconButton';

const AddToCart = ({ product }) => (
  <QuantityField>
    {(quantity) => (
      <AddToCartIconButton
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
