/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import { CartContext } from '../context';

const RemoveFromCart = ({ id }) => {
  const { t } = useTranslation();
  const { remove } = React.useContext(CartContext);

  return (
    <Box>
      <Button
        size="small"
        onClick={() => remove(id)}
        style={{
          textDecoration: 'underline',
          justifyContent: 'flex-start',
        }}
      >
        {t('labels:remove')}
      </Button>
    </Box>
  );
};

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};

const Toggle = ({ id, product, quantity }) => {
  const { t } = useTranslation();
  const [value, setQuantity] = React.useState(quantity);
  const { update, remove, loading } = React.useContext(
    CartContext,
  );

  const sendUpdateRequest = (newValue) =>
    update({ id, product, quantity: newValue }).then(() => {
      return setQuantity(newValue);
    });

  const increase = () => sendUpdateRequest(value + 1);

  const decrease = () => {
    const newValue = value - 1;
    if (newValue > 0) {
      return sendUpdateRequest(newValue);
    }
    return remove(id);
  };

  return (
    <TextField
      disabled={loading}
      variant="outlined"
      name="quantity"
      value={value}
      onChange={({ target }) => {
        setQuantity(target.value);
      }}
      onBlur={() => {
        sendUpdateRequest(value);
      }}
      inputProps={{
        'aria-label': t('labels:quantity'),
        style: {
          textAlign: 'center',
        },
      }}
      InputProps={{
        style: {
          width: 135,
        },

        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              size="small"
              onClick={decrease}
              disabled={loading}
            >
              <Remove />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={increase}
              disabled={loading}
            >
              <Add />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

Toggle.propTypes = {
  quantity: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
};

export default ({ children }) => {
  const { items = [] } = React.useContext(CartContext);
  return items.map((item) => {
    const {
      id,
      product,
      price,
      name,
      img,
      subtotal,
      quantity,
      description,
    } = item;

    return (
      <Box mb={1}>
        <Paper elevation={2}>
          <Box p={2}>
            <Box component="div">
              <Grid
                container
                spacing={1}
                alignItems="center"
                justify="space-between"
              >
                <Grid item lg={8} md={12} sm={12}>
                  <Grid container spacing={2}>
                    <Grid item style={{ width: 'auto' }}>
                      <Avatar
                        variant="rounded"
                        style={{
                          width: 95,
                          height: 95,
                          marginTop: 10,
                        }}
                      >
                        <img src={img} alt={product} />
                      </Avatar>
                    </Grid>

                    <Grid item md={8} sm={9} xs={12}>
                      <Box>
                        <Typography
                          variant="overline"
                          color="primary"
                        >
                          ${price} ea.
                        </Typography>
                        <Typography
                          variant="h5"
                          component="h4"
                        >
                          {name}
                        </Typography>

                        <Typography>
                          {description}
                        </Typography>

                        {children && children(item)}
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item lg={4} sm={12}>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Grid item lg={5} md={3} xs={12}>
                      <Typography
                        color="primary"
                        variant="h4"
                        component="span"
                      >
                        ${subtotal}
                      </Typography>
                      <RemoveFromCart
                        id={id}
                        product={product}
                      />
                    </Grid>
                    <Grid item lg={5} md={12}>
                      <Toggle
                        id={id}
                        product={product}
                        quantity={quantity}
                        price={price}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  });
};
