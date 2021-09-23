import React from 'react';
import { Box } from '@material-ui/core';

// eslint-disable-next-line
const Wrapper = ({ children, ...rest }) => (
  <Box
    {...rest}
    bgcolor="background.paper"
    height="100%"
    position="relative"
    width="100%"
  >
    {children}
  </Box>
);

export default Wrapper;
