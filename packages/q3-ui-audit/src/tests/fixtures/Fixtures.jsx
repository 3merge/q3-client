import React from 'react';
import { Box, Container, Paper } from '@material-ui/core';
import AuthSource from './AuthSource';
import RestSource from './RestSource';

// eslint-disable-next-line
export default ({ children, ...props }) => (
  <Paper>
    <Box py={4}>
      <Container>
        <RestSource {...props}>
          <AuthSource {...props}>{children}</AuthSource>
        </RestSource>
      </Container>
    </Box>
  </Paper>
);
