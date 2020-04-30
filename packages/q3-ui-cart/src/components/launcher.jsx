import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { IconButtonWithLoading } from 'q3-ui/lib/iconButton';
import useOpen from 'useful-state/lib/useOpen';
import { CartContext } from '../context';

const CartLauncher = ({ children }) => {
  const {
    items = [],
    loading,
    hasError,
  } = React.useContext(CartContext);

  const { isOpen, close, open } = useOpen();

  React.useEffect(() => {
    if (hasError)
      open({
        target: hasError,
      });
  }, [hasError]);

  return (
    <>
      <IconButtonWithLoading
        label="openCart"
        loading={loading}
        icon={ShoppingCart}
        badgeContent={items.length}
        buttonProps={{
          onClick: open,
        }}
      />
      {children && children(close, isOpen)}
    </>
  );
};

CartLauncher.propTypes = {
  children: PropTypes.func.isRequired,
};

export default CartLauncher;
