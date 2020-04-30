/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { IconButtonWithLoading } from 'q3-ui/lib/iconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import withQuantity from './withQuantity';

export default withQuantity(
  ({ loading, disabled, onClick }) => (
    <IconButtonWithLoading
      label="addToCart"
      loading={loading}
      icon={AddShoppingCartIcon}
      buttonProps={{
        disabled,
        onClick,
      }}
    />
  ),
);
