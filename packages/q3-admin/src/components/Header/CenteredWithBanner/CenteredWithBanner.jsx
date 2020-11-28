import React from 'react';
import { useHeader } from 'q3-hooked';
import {
  Box,
  Container,
  Typography,
} from '@material-ui/core';
import * as Photo from '../../Photo';

const CenteredWithBanner = ({ children }) => {
  const { title } = useHeader();

  return (
    <Container
      component="header"
      maxWidth="xl"
      style={{ padding: 0 }}
    >
      <Photo.Banner />
      <Box
        bgcolor="background.paper"
        mt={-5}
        mx="8.5vw"
        p={2}
        position="relative"
        textAlign="center"
      >
        <Typography variant="h1">{title}</Typography>
        {children}
      </Box>
    </Container>
  );
};

export default CenteredWithBanner;
