import React from 'react';
import { Link } from 'gatsby';
import { Views } from 'q3-ui';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

export default ({ children, sidebarStyles }) => (
  <Grid container alignItems="center">
    <Grid item xs={7}>
      <Container maxWidth="sm" component="main">
        <Box py={2}>
          <Views.Login service={() => null} />
          <Link to="password-reset">
            Forget your password?
          </Link>
        </Box>
      </Container>
    </Grid>
    <Grid item xs={5} component="aside">
      {children}
    </Grid>
  </Grid>
);
