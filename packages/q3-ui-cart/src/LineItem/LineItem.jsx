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
import LineItemSubtotal from '../LineItemSubtotal';
import LineItemToggle from '../LineItemToggle';
import useStyle from './useStyle';

export default ({ children }) => {
  const { items = [] } = React.useContext(CartContext);
  const { avatar } = useStyle();

  return React.useMemo(
    () =>
      items.map((item, i) => {
        const {
          id,
          product,
          price,
          name,
          img,
          subtotal,
          quantity,
          description,
          disabled,
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
                  <Grid container spacing={2}>
                    <Grid item style={{ width: 'auto' }}>
                      <Avatar
                        variant="rounded"
                        className={avatar}
                      >
                        <img src={img} alt={product} />
                      </Avatar>
                    </Grid>
                    <Grid item md={10} sm={9} xs={12}>
                      <Box>
                        <Typography
                          variant="overline"
                          color="primary"
                        >
                          {string.toPrice(price)} ea.
                        </Typography>
                        <Typography
                          variant="h4"
                          component="h3"
                          gutterBottom
                        >
                          {name}
                        </Typography>
                        <Typography>
                          <small>{description}</small>
                        </Typography>
                        <LineItemSubtotal
                          subtotal={subtotal}
                        />
                      </Box>
                      {children && children(item)}
                      <LineItemToggle
                        id={id}
                        product={product}
                        quantity={quantity}
                        price={price}
                        disabled={disabled}
                      />
                      <LineItemRemove
                        id={id}
                        product={product}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Paper>
          </Box>
        );
      }),
    [JSON.stringify(items)],
  );
};
