import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

export default ({ form, details }) => (
  <Container>
    <Box my={4}>
      <Grid container spacing={3}>
        <Grid item xs={6} />
        <Grid item xs={1}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item xs={5}>
          {details}
        </Grid>
      </Grid>
    </Box>
  </Container>
);
