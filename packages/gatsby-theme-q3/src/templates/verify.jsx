import React from 'react';
import { Link } from 'gatsby';
import { Views } from 'q3-ui';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

export default ({ children }) => (
  <Grid container alignItems="center">
    <Grid item xs={7}>
      <Container maxWidth="sm" component="main">
        <Box py={2}>
          <Views.Verify service={() => null} />
        </Box>
      </Container>
    </Grid>
  </Grid>
);
