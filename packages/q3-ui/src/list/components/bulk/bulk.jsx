import React from 'react';
import Grid from '@material-ui/core/Grid';

const Bulk = ({ children }) => (
  <Grid container>
    <Grid item md={6} xs={12}>
      {children}
    </Grid>
    <Grid item md={6} xs={12}>
      dsdf
    </Grid>
  </Grid>
);

export default Bulk;
