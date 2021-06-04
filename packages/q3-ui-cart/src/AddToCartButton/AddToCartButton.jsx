/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'class-names';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import { CartContext } from '../context';
import AddToCartButtonLoading from '../AddToCartButtonLoading';
import { ADD_TO_CART_CLASS } from '../constants';
import useStyle, { getFromProps } from './useStyle';
import useReset from './useReset';

const AddToCart = ({
  quantity = 1,
  product,
  disabled: isDisabled,
  ...rest
}) => {
  const { add } = React.useContext(CartContext);
  const { t } = useTranslation('labels');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = useReset();
  const [error, setError] = useReset();
  const { btn } = useStyle({
    success,
    error,
  });

  const disabled = quantity <= 0 || loading;
  const { icon: Icon, label } = getFromProps({
    success,
    error,
  });

  const onClick = React.useCallback(() => {
    setLoading(true);
    return add({
      ...rest,
      product,
      quantity,
    })
      .then(setSuccess)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [quantity]);

  return (
    <Button
      fullWidth
      className={classnames(ADD_TO_CART_CLASS, btn)}
      onClick={onClick}
      disabled={disabled || isDisabled}
      variant="contained"
      size="large"
      color="primary"
      aria-label={`${t('add')} ${quantity}`}
      aria-busy={loading}
    >
      <AddToCartButtonLoading loading={loading}>
        <Icon />
        <Hidden smDown>
          <Box ml={0.5}>{t(label)}</Box>
        </Hidden>
      </AddToCartButtonLoading>
    </Button>
  );
};

AddToCart.defaultProps = {
  disabled: false,
};

AddToCart.propTypes = {
  quantity: PropTypes.number.isRequired,
  product: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default AddToCart;
