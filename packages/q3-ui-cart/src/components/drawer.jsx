import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Box from '@material-ui/core/Box';
import IconButton from 'q3-ui/lib/iconButton';
import AppBar from '@material-ui/core/AppBar';
import { EditableTypography } from 'q3-components';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import { Signal, Connect } from 'q3-ui-assets';
import { red } from '@material-ui/core/colors';
import { CartContext } from '../context';

const useStyles = makeStyles((theme) => ({
  img: {
    margin: '0 auto 2rem',
    maxWidth: '100%',
    width: 175,

    'svg': {
      maxWidth: '100%',
    },
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

const hasItems = (items) =>
  Array.isArray(items) && items.length;

const CartDrawerInterior = ({ children }) => {
  const { img, root } = useStyles();
  const { items = [], hasError } = React.useContext(
    CartContext,
  );

  const { t } = useTranslation();
  const len = hasItems(items);
  const namespace = hasError ? 'cartError' : 'cartEmpty';
  const Icon = hasError ? Signal : Connect;

  return (
    <Container className={root}>
      <Box py={2}>
        {!len || hasError ? (
          <>
            <Box className={img}>
              <Icon />
            </Box>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
            >
              {t(`titles:${namespace}`)}
            </Typography>
            <Typography align="center" gutterBottom>
              {t(`descriptions:${namespace}`)}
            </Typography>
          </>
        ) : null}
        {children}
      </Box>
    </Container>
  );
};

CartDrawerInterior.propTypes = {
  children: PropTypes.node.isRequired,
};

const renderNumber = (v) => {
  const num = Number(v);
  return !Number.isNaN(num)
    ? `$${num.toFixed(2)}`
    : '$0.00';
};

const CartDrawer = ({
  isOpen,
  close,
  shopPath,
  checkoutPath,
  children,
  currency,
}) => {
  const { t } = useTranslation();
  const { bar } = useStyles();
  const {
    subtotal,
    loading,
    hasError,
    items,
    clear,
    saveCartTitle,
    cartTitleProp,
    ...rest
  } = React.useContext(CartContext);

  const title = get(rest, cartTitleProp, t('titles:cart'));

  return (
    <Drawer open={isOpen} anchor="right" onClose={close}>
      <div>
        <AppBar
          position="static"
          color="inherit"
          elevation={10}
        >
          <Fade in={loading}>
            <LinearProgress />
          </Fade>
          <Toolbar className={bar}>
            <Box display="flex" alignItems="center">
              <IconButton
                icon={KeyboardBackspace}
                label="close"
                buttonProps={{
                  onClick: close,
                  color: 'primary',
                }}
              />
              <EditableTypography
                variant="h3"
                onSubmit={saveCartTitle}
                initialValues={{ title }}
                fieldProps={{ name: 'title', type: 'text' }}
                style={{
                  marginLeft: '1rem',
                  maxWidth: 350,
                  textOverflow: 'ellipsis',
                  display: 'block',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
                isEditable={
                  typeof saveCartTitle === 'function'
                }
              >
                {title}
              </EditableTypography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body2">
                {renderNumber(subtotal)} {currency}
              </Typography>
              {clear && (
                <IconButton
                  icon={DeleteForever}
                  label="startOver"
                  buttonProps={{
                    onClick: clear,
                    style: {
                      color: red[900],
                      marginLeft: '0.5rem',
                    },
                  }}
                />
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Box>
          <CartDrawerInterior>
            {children}
            {hasError ? (
              <Box my={1}>
                <Typography align="center">
                  <Button
                    onClick={() => {
                      if (clear) clear();
                      close();
                    }}
                    variant="contained"
                    color="secondary"
                    size="large"
                    fullWidth
                  >
                    {t('labels:startOver')}
                  </Button>
                </Typography>
              </Box>
            ) : (
              <Box my={1}>
                <Typography align="center">
                  <Button
                    onClick={() => {
                      navigate(checkoutPath);
                      close();
                    }}
                    disabled={!hasItems(items)}
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
            )}
          </CartDrawerInterior>
        </Box>
      </div>
    </Drawer>
  );
};

CartDrawer.propTypes = {
  close: PropTypes.func.isRequired,
  checkoutPath: PropTypes.string,
  shopPath: PropTypes.string,
  isOpen: PropTypes.bool,
  currency: PropTypes.string,
  children: PropTypes.node,
};

CartDrawer.defaultProps = {
  currency: 'CAD',
  isOpen: false,
  checkoutPath: '/checkout',
  shopPath: '/shop',
  children: null,
};

export default CartDrawer;
