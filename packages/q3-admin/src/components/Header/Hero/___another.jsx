import React from 'react';
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import * as Back from '../../Back';
import * as Photo from '../../Photo';

const Hero = () => {
  return (
    <Container component="header" maxWidth="xl">
      <Box mt={2} mb={2}>
        <Box mb={0.5}>
          <Back.Button />
        </Box>
        <Grid
          alignItems="center"
          container
          justify="space-between"
        >
          <Grid item>
            <Typography variant="h1">
              Name of the resource
            </Typography>
            <Typography
              component="p"
              gutterBottom={false}
              variant="body2"
            >
              A small identifier
            </Typography>
          </Grid>
          <Grid item style={{ textAlign: 'right' }}>
            <Typography
              color="secondary"
              component="span"
              variant="h2"
            >
              $185,123 CAD
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />

      <Box my={2}>
        <Photo.Banner />
      </Box>
    </Container>
  );
};

export default Hero;
