import React from 'react';
import { useHeader } from 'q3-hooked';
import {
  Box,
  Container,
  Typography,
} from '@material-ui/core';
import * as Photo from '../../Photo';

const CenteredWithAvatar = () => {
  const { title } = useHeader();

  return (
    <Container component="header" maxWidth="xl">
      <Box mt={2} textAlign="center">
        <Photo.Avatar />
        <Typography variant="h1">{title}</Typography>
      </Box>
    </Container>
  );
};

export default CenteredWithAvatar;
