import React from 'react';
import {
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import * as Back from '../../Back';
import * as Photo from '../../Photo';

const Hero = () => (
  <Container component="header" maxWidth="xl">
    <Grid alignItems="center" container spacing={2}>
      <Back.IconButton />
      <Photo.Avatar />
      <Grid item>
        <Typography component="h1" variant="h4">
          Name of the resource
        </Typography>
        <Typography component="p" gutterBottom={false}>
          A small identifier
        </Typography>
      </Grid>
    </Grid>
  </Container>
);

export default Hero;
