import React from 'react';
import Grid from '@material-ui/core/Grid';

export default (Component, sizes) => ({
  xl = 4,
  lg = 6,
  md = 6,
  ...rest
}) => (
  <Grid item {...{ xl, lg, md, ...sizes }} sm={12} xs={12}>
    <Component {...rest} />
  </Grid>
);
