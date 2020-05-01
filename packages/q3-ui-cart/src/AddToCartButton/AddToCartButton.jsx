/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { CartContext } from '../context';
import AddToCartButtonLoading from '../AddToCartButtonLoading';
import { ADD_TO_CART_CLASS } from '../constants';

const AddToCart = ({ quantity = 1, product }) => {
  const { add } = React.useContext(CartContext);
  const { t } = useTranslation('labels');
  const [loading, setLoading] = React.useState(false);

  const disabled = quantity <= 0 || loading;
  const label = t('addToCart');

  const onClick = React.useCallback(() => {
    setLoading(true);
    return add({
      product,
      quantity,
    })
      .catch(() => {
        // noop
      })
      .finally(() => {
        setLoading(false);
      });
  }, [quantity]);

  return (
    <Button
      fullWidth
      className={ADD_TO_CART_CLASS}
      onClick={onClick}
      disabled={disabled}
      variant="contained"
      size="large"
      color="primary"
      aria-label={label}
      aria-busy={loading}
      style={{
        alignSelf: 'stretch',
        display: 'flex',
        margin: '0 0 0 0.25rem',
      }}
    >
      <AddToCartButtonLoading loading={loading}>
        <ShoppingCart />
        <Hidden xsDown>
          <Box ml={0.5}>{label}</Box>
        </Hidden>
      </AddToCartButtonLoading>
    </Button>
  );
};

AddToCart.propTypes = {
  quantity: PropTypes.number.isRequired,
  product: PropTypes.string.isRequired,
};

export default AddToCart;
