/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import withQuantity from './withQuantity';
import { AddToCartLoadingIndicator } from './addToCartButton';

export default withQuantity(
  ({ loading, disabled, onClick }) => {
    const { t } = useTranslation('labels');

    return (
      <IconButton
        color="primary"
        disabled={disabled}
        onClick={onClick}
        aria-busy={t('addToCart')}
      >
        <AddToCartLoadingIndicator loading={loading}>
          <AddShoppingCartIcon />
        </AddToCartLoadingIndicator>
      </IconButton>
    );
  },
);
