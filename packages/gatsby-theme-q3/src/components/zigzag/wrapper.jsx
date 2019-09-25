import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { grey } from '@material-ui/core/colors';

const Wrapper = ({ children, backgroundColor, index, space }) => (
  <Box
    py={space ? 8 : 4}
    mb={space ? 4 : 0}
    style={{
      backgroundColor: backgroundColor
        ? backgroundColor[50]
        : index % 2
        ? grey[100]
        : '#fff',
    }}
  >
    <Container maxWidth="lg">{children}</Container>
  </Box>
);

export default Wrapper;
