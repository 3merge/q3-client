import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Item from './item';

const CardList = ({ data, border, columns }) => (
  <Grid container spacing={2}>
    {data.map((item) => (
      <Grid item xs={12 / columns} key={item.slug}>
        <Item {...item} withBorders={border} />
      </Grid>
    ))}
  </Grid>
);

CardList.defaultProps = {
  columns: 3,
  data: [],
};

export default CardList;
