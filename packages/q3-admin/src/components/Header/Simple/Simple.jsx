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

const Simple = () => {
  const { collectionName, onClick, photo } = useHeader();

  return (
    <Container component="header" maxWidth="xl">
      <Box mt={2} mb={2}>
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
        </Grid>
      </Box>
    </Container>
  );
};

export default Simple;
