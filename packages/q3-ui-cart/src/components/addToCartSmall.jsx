/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Quantity } from 'q3-components';
import Grid from '@material-ui/core/Grid';
import AddToCartIconButton from './addToCartIconButton';

const AddToCart = ({ product }) => (
  <Grid container spacing={1}>
    <Quantity size="small">
      {(quantity) => (
        <Grid item xs>
          <AddToCartIconButton
            quantity={quantity}
            product={product}
          />
        </Grid>
      )}
    </Quantity>
  </Grid>
);

AddToCart.propTypes = {
  product: PropTypes.string.isRequired,
};

export default AddToCart;
