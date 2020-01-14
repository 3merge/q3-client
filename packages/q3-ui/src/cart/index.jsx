import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { blueGrey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import InputAdornment from '@material-ui/core/InputAdornment';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import useOpen from 'useful-state/lib/useOpen';
import graphic from '../../images/waiting.png';

const useStyles = makeStyles(() => ({
  bullet: {
    padding: '0 0 0 1rem',
    marginLeft: '3rem',
    width: 'calc(100% - 3rem)',
    '&::before': {
      content: "''",
      height: '100%',
      width: 2,
      background: blueGrey[100],
      display: 'block',
      position: 'absolute',
      top: 0,
      left: '-1rem',
    },
    '&::after': {
      content: "''",
      height: 10,
      width: 10,
      borderRadius: 500,
      background: blueGrey[100],
      display: 'block',
      position: 'absolute',
      top: '50%',
      left: '-0.96rem',
      transform: 'translate(-50%,-50%)',
    },
  },
}));

const Toggle = ({ quantity }) => {
  const [value, setQuantity] = React.useState(quantity);

  const decrease = () => setQuantity(Number(value) - 1);
  const increase = () => setQuantity(Number(value) + 1);

  return (
    <TextField
      variant="outlined"
      label="quantity"
      name="quantity"
      size="small"
      value={value}
      onChange={(e, v) => {
        if (typeof parseInt(v, 10) === 'number')
          setQuantity(v);
      }}
      helperText="Totals $255"
      InputProps={{
        style: {
          width: 150,
        },
        startAdornment: (
          <InputAdornment position="start">
            <IconButton size="small" onClick={decrease}>
              <Remove />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size="small" onClick={increase}>
              <Add />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

Toggle.propTypes = {
  quantity: PropTypes.number,
};

Toggle.defaultProps = {
  quantity: 0,
};

export const CartProgressList = ({ items }) => {
  const { bullet } = useStyles();

  return (
    <List>
      {items.map((item, i) => (
        <ListItem item={i} className={bullet}>
          <ListItemText {...item} />
        </ListItem>
      ))}
    </List>
  );
};

const CartContext = ({
  onUpdate,
  onRemove,
  onAdd,
  items,
}) => {
  return null;
};

export const CardItem = ({
  product,
  name,
  label,
  price,
  quantity,
  img,
  children,
}) => {
  return (
    <Paper elevation={2}>
      <Box p={1}>
        <ListItem component="div">
          <ListItemAvatar>
            <img src={img} alt={product} height={65} />
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={
              <>
                <Box component="span" display="block">
                  <strong>{label}</strong>
                </Box>
                <Typography
                  variant="subtitle2"
                  component="span"
                  color="primary"
                >
                  {price}
                </Typography>
              </>
            }
          />
          <ListItemSecondaryAction>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Toggle quantity={quantity} price={price} />
              </Grid>
              <Grid item>
                <IconButton size="small">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        {children}
      </Box>
    </Paper>
  );
};

const Cart = ({ items, total, updated, redirectPath }) => {
  const { isOpen, close, open } = useOpen();
  const { t } = useTranslation();

  return (
    <>
      <IconButton color="primary" onClick={open}>
        <Badge
          color="secondary"
          variant={!total ? 'dot' : null}
          badgeContent={total}
        >
          <ShoppingCart />
        </Badge>
      </IconButton>
      <Drawer open={isOpen} anchor="right">
        <Box py={2}>
          <Toolbar
            style={{ justifyContent: 'space-between' }}
          >
            <IconButton color="primary" onClick={close}>
              <KeyboardBackspace />
            </IconButton>
            <Typography variant="h3">
              {t('titles:cart')}
            </Typography>

            <Typography variant="body2">
              <mark>$0.00</mark>
            </Typography>
          </Toolbar>

          <Container
            style={{
              width: 750,
            }}
          >
            <List
              component="div"
              style={{ margin: '2rem 0' }}
            >
              {!items || !items.length ? (
                <img
                  src={graphic}
                  alt={t('labels:empty')}
                  style={{
                    display: 'block',
                    margin: '0 auto',
                    maxWidth: '100%',
                    width: 450,
                    mixBlendMode: 'multiply',
                  }}
                />
              ) : (
                items.map(
                  ({
                    id,
                    sku,
                    attribute,
                    imgSrc,
                    price,
                    quantity,
                  }) => (
                    <Paper
                      key={id}
                      style={{
                        marginBottom: '0.5rem',
                        padding: '1rem',
                      }}
                      elevation={2}
                    >
                      <ListItem key={sku} component="div">
                        <ListItemAvatar>
                          <img
                            src={imgSrc}
                            alt={sku}
                            height={65}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={attribute}
                          secondary={
                            <>
                              <Box
                                component="span"
                                display="block"
                              >
                                <strong>{sku}</strong>
                              </Box>
                              <Typography
                                variant="subtitle2"
                                component="span"
                                color="primary"
                              >
                                {price}
                              </Typography>
                            </>
                          }
                        />

                        <ListItemSecondaryAction>
                          <Grid
                            container
                            spacing={1}
                            alignItems="center"
                          >
                            <Grid item>
                              <Toggle
                                quantity={quantity}
                                price={price}
                              />
                            </Grid>
                            <Grid item>
                              <IconButton size="small">
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </ListItemSecondaryAction>
                      </ListItem>

                      <CartProgressList
                        items={[
                          {
                            primary: 'EXAMPLE',
                            secondary: 'OOPH',
                          },
                        ]}
                      />
                    </Paper>
                  ),
                )
              )}
            </List>
            <Box my={1}>
              <Typography align="center">
                <Button
                  disabled={!items || !items.length}
                  onClick={() => navigate(redirectPath)}
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                >
                  {t('labels:checkout', {
                    subtotal: '0.00',
                  })}
                </Button>
                <Box my={0.5}>
                  <Button gutterBottom size="small">
                    {t('labels:shop')}
                  </Button>
                </Box>
              </Typography>
            </Box>
          </Container>
        </Box>
      </Drawer>
    </>
  );
};

export default Cart;
