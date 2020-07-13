import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const AppViewHeader = () => (
  <Box
    width="100%"
    pt={2}
    pb={1}
    style={{ backgroundColor: '#FFF' }}
  >
    <Container maxWidth="xl">
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="h6" component="h1">
            Name of the page
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Add
          </Button>
          <Button variant="contained">Import</Button>
          <Button variant="contained">Export</Button>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default AppViewHeader;
