import React from 'react';
import { useHeader } from 'q3-hooked';
import {
  Box,
  Container,
  Typography,
} from '@material-ui/core';
import * as Photo from '../../Photo';

const Centered = () => {
  const { title } = useHeader();

  return (
    <Container component="header" maxWidth="xl">
      <Photo.Banner />
      <Box textAlign="center" my={2}>
        <Typography variant="h1">{title}</Typography>
      </Box>
    </Container>
  );
};

export default Centered;
