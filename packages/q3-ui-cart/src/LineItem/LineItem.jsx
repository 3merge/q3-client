/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { string } from 'q3-ui-helpers';
import { Quantity } from 'q3-components';
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
  const [setQuantity] = React.useState(quantity);
  const { update, remove, loading } = React.useContext(
    CartContext,
  );

  const sendUpdateRequest = (newValue) =>
    update({ id, product, quantity: newValue }).then(() => {
      return setQuantity(newValue);
    });

  return (
    <Quantity
      size="small"
      defaultValue={quantity}
      disabled={loading}
      minimum={1}
      onBlur={({ target: { value } }) => {
        if (value) sendUpdateRequest(value);
      }}
      onMinimum={remove}
      onQuantityChange={sendUpdateRequest}
      variant="spread"
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

  return items.map((item, i) => {
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
      <Box
        key={id || i}
        className="q3-cart-line-item"
        mb={1}
      >
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
                          variant="h4"
                          component="h4"
                        >
                          {name}
                        </Typography>

                        <Typography>
                          {description}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item lg={4} sm={12}>
                  <Typography
                    color="primary"
                    variant="h5"
                    component="p"
                  >
                    {string.toPrice(subtotal)}
                  </Typography>

                  <Toggle
                    id={id}
                    product={product}
                    quantity={quantity}
                    price={price}
                  />
                  <RemoveFromCart
                    id={id}
                    product={product}
                  />
                </Grid>
              </Grid>

              {children && children(item)}
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  });
};
