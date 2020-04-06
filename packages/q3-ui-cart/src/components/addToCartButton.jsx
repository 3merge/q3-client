/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import { CartContext } from '../context';
import { height } from './useStyle';

const AddToCartIcon = ({ withText }) => {
  const { t } = useTranslation('labels');

  return withText ? (
    <div style={{ display: 'flex' }}>
      <ShoppingCart style={{ marginRight: '.5rem' }} />
      {t('addToCart')}
    </div>
  ) : (
    <Add />
  );
};

const AddToCartIconButton = ({
  children,
  loading,
  withText,
}) => {
  return loading ? (
    <CircularProgress color="#FFF" />
  ) : (
    <Fade in={!loading}>
      <AddToCartIcon withText={withText} />
    </Fade>
  );
};

const AddToCartButton = ({ quantity, product, small }) => {
  const { add, loading } = React.useContext(CartContext);

  const disabled = quantity <= 0;
  const onClick = () =>
    add({
      product,
      quantity,
    });

  return small ? (
    <IconButton disabled={disabled} onClick={onClick}>
      <AddToCartIconButton loading={loading} />
    </IconButton>
  ) : (
    <Button
      fullWidth
      variant="contained"
      size="large"
      color="primary"
      disabled={disabled}
      onClick={onClick}
      style={{ height, marginTop: 4 }}
    >
      <AddToCartIconButton loading={loading} withText />
    </Button>
  );
};

AddToCartButton.propTypes = {
  small: PropTypes.bool,
  quantity: PropTypes.number.isRequired,
  product: PropTypes.string.isRequired,
};

AddToCartButton.defaultProps = {
  small: false,
};

export default AddToCartButton;
