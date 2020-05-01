import React from 'react';
import PropTypes from 'prop-types';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { IconButtonWithLoading } from 'q3-ui/lib/iconButton';
import { useOpen } from 'useful-state';
import { CartContext } from '../context';

const CartLauncher = ({ children }) => {
  const {
    loading,
    hasError,
    items = [],
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
