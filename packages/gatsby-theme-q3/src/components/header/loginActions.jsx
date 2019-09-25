import React from 'react';
import { Link } from 'gatsby';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default () => (
  <Grid container spacing={3} style={{ width: 'auto' }}>
    <Grid item>
      <Button component={Link} to="/sign-up">
        Sign up
      </Button>
    </Grid>
    <Grid item>
      <Button
        component={Link}
        to="/login"
        color="secondary"
        variant="contained"
      >
        Login
      </Button>
    </Grid>
  </Grid>
);
