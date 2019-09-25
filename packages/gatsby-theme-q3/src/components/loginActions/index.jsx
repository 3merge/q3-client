import React from 'react';
import { Link } from 'gatsby';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default () => (
  <Grid container spacing={1} align="center">
    <Grid item>
      <Button
        component={Link}
        to="/register"
        variant="outlined"
        color="primary"
      >
        Sign up
      </Button>
    </Grid>
    <Grid item>
      <Button
        component={Link}
        to="/login"
        variant="contained"
        color="primary"
      >
        Login
      </Button>
    </Grid>
  </Grid>
);
