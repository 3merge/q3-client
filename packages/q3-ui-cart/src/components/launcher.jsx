import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import useOpen from 'useful-state/lib/useOpen';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import { CartContext } from '../context';

const useStyles = makeStyles(() => ({
  loader: {
    height: '100% !important',
    position: 'absolute',
    width: '100% !important',
  },
}));

const CartLauncher = ({ children }) => {
  const { loader } = useStyles();
  const { items = [], loading } = React.useContext(
    CartContext,
  );
  const { isOpen, close, open } = useOpen();
  const { t } = useTranslation();

  return (
    <>
      <IconButton
        onClick={open}
        aria-label={t('labels:openCart')}
      >
        <Fade in={loading}>
          <CircularProgress className={loader} />
        </Fade>
        <Badge
          color="secondary"
          variant={items.length ? 'standard' : 'dot'}
          badgeContent={items.length}
        >
          <ShoppingCart />
        </Badge>
      </IconButton>
      {children && children(close, isOpen)}
    </>
  );
};

CartLauncher.propTypes = {
  children: PropTypes.func.isRequired,
};

export default CartLauncher;
