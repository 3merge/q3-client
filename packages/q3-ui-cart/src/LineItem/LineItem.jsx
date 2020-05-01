/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { string } from 'q3-ui-helpers';
import { CartContext } from '../context';
import { DRAWER_LINE_ITEM_CLASS } from '../constants';
import LineItemRemove from '../LineItemRemove';
import LineItemToggle from '../LineItemToggle';

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
        className={DRAWER_LINE_ITEM_CLASS}
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
                          {string.toPrice(price)} ea.
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

                  <LineItemToggle
                    id={id}
                    product={product}
                    quantity={quantity}
                    price={price}
                  />
                  <LineItemRemove
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
