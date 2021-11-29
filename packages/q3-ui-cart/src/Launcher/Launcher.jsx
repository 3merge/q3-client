import React from 'react';
import PropTypes from 'prop-types';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { useTranslation } from 'q3-ui-locale';
import { IconButtonWithLoading } from 'q3-ui/lib/iconButton';
import { useOpen } from 'useful-state';
import {
  CartContext,
  CartLoadingContext,
} from '../context';
import { DRAWER_LAUNCHER } from '../constants';

const CartLauncher = ({ children }) => {
  const { hasError, items = [] } =
    React.useContext(CartContext);
  const loading = React.useContext(CartLoadingContext);
  const { t } = useTranslation('labels');
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
        label={t('inCart', { num: String(items.length) })}
        loading={loading}
        icon={ShoppingCart}
        badgeContent={items.length}
        buttonProps={{
          className: DRAWER_LAUNCHER,
          onClick: open,
          'aria-expanded': isOpen,
        }}
      />
      {children && children(close, isOpen)}
    </>
  );
};

CartLauncher.propTypes = {
  children: PropTypes.func,
};

CartLauncher.defaultProps = {
  children: null,
};

export default CartLauncher;
