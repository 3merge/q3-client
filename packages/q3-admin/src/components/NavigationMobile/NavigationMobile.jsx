import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

const NavigationMobile = ({ children }) => (
  <Box width="100%" display="flex" p={1}>
    {children}
  </Box>
);

export default NavigationMobile;
