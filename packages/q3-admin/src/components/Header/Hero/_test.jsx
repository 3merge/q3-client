import React from 'react';
import { useHeader } from 'q3-hooked';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import Image from 'gatsby-image';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const Hero = () => {
  const { collectionName, onClick, photo } = useHeader();

  return (
    <Container component="header" maxWidth="xl">
      <Box mt={2} mb={2}>
        <Box mb={0.5}>
          <Button onClick={onClick}>
            <ArrowBackIosIcon />
            Return to {collectionName}
          </Button>
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
      {photo && (
        <Box my={2}>
          <Image
            aria-hidden
            fluid={{ src: photo }}
            style={{
              height: 300,
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export default Hero;
