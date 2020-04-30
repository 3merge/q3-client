/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Quantity } from 'q3-components';
import Grid from '@material-ui/core/Grid';
import AddToCartButton from './addToCartButton';

const AddToCart = ({ product, ...rest }) => (
  <Grid container spacing={1}>
    <Quantity {...rest} size="large">
      {(quantity) => (
        <Grid item md={8} sm={6} xs={12}>
          <AddToCartButton
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
