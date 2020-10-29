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
          <Grid
            role="rowgroup"
            container
            alignItems="center"
            key={id}
            spacing={3}
          >
            <Grid
              item
              role="rowheader"
              style={{ maxWidth: 230 }}
            >
              <Grid container spacing={2}>
                <Grid item style={{ width: 65 }}>
                  <Avatar aria-hidden variant="rounded">
                    <img src={img} alt={product} />
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    variant="overline"
                  >
                    {name}
                  </Typography>
                  <Typography>{description}</Typography>
                  <Typography>
                    {string.toPrice(price)} each
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item role="cell">
              {string.toPrice(subtotal)}
            </Grid>
            <Grid item role="cell">
              <LineItemToggle
                id={id}
                product={product}
                quantity={quantity}
                price={price}
                disabled={disabled}
              />
              <LineItemRemove id={id} product={product} />
            </Grid>
          </Grid>
        );
      }),
    [JSON.stringify(items)],
  );
};
