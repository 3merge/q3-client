import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import { CartContext } from '../context';
import Empty from './empty';

const useStyles = makeStyles((theme) => ({
  img: {
    margin: '0 auto',
    maxWidth: '100%',
    width: 150,
  },
  root: {
    marginTop: theme.spacing(2),
    width: '45vw',
    [theme.breakpoints.down('lg')]: {
      width: '50vw',
    },
    [theme.breakpoints.down('md')]: {
      width: '70vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90vw',
    },
  },
  bar: {
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
}));

const CartDrawerInterior = ({ children }) => {
  const { img, root } = useStyles();
  const { items = [] } = React.useContext(CartContext);

  const { t } = useTranslation();

  return (
    <Container className={root}>
      <Box py={2}>
        {!Array.isArray(items) ||
          (!items.length && (
            <>
              <Box className={img}>
                <Empty />
              </Box>
              <Typography
                variant="h2"
                align="center"
                gutterBottom
              >
                {t('titles:empty')}
              </Typography>
              <Typography
                variant="body2"
                align="center"
                gutterBottom
              >
                {t('descriptions:empty')}
              </Typography>
            </>
          ))}
        {children}
      </Box>
    </Container>
  );
};

CartDrawerInterior.propTypes = {
  children: PropTypes.node.isRequired,
};

const CartDrawer = ({
  isOpen,
  close,
  shopPath,
  checkoutPath,
  children,
}) => {
  const { t } = useTranslation();
  const { bar } = useStyles();
  const { subtotal, loading } = React.useContext(
    CartContext,
  );

  return (
    <Drawer open={isOpen} anchor="right" onClose={close}>
      <AppBar
        position="static"
        color="inherit"
        elevation={10}
      >
        <Fade in={loading}>
          <LinearProgress />
        </Fade>
        <Toolbar className={bar}>
          <IconButton color="primary" onClick={close}>
            <KeyboardBackspace />
          </IconButton>
          <Typography variant="h3">
            {t('titles:cart')}
          </Typography>
          <Typography variant="body2">
            ${Number(subtotal).toFixed(2)}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <CartDrawerInterior>
          {children}
          <Box my={1}>
            <Typography align="center">
              <Button
                onClick={() => {
                  navigate(checkoutPath);
                  close();
                }}
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
              >
                {t('labels:checkout')}
              </Button>
              <Box my={0.5}>
                <Button
                  onClick={() => {
                    navigate(shopPath);
                    close();
                  }}
                  gutterBottom
                  size="small"
                >
                  {t('labels:shop')}
                </Button>
              </Box>
            </Typography>
          </Box>
        </CartDrawerInterior>
      </Box>
    </Drawer>
  );
};

CartDrawer.propTypes = {
  close: PropTypes.func.isRequired,
  checkoutPath: PropTypes.string,
  shopPath: PropTypes.string,
  isOpen: PropTypes.bool,
  children: PropTypes.node,
};

CartDrawer.defaultProps = {
  isOpen: false,
  checkoutPath: '/checkout',
  shopPath: '/shop',
  children: null,
};

export default CartDrawer;
