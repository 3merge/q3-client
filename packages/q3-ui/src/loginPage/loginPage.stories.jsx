import React from 'react';
import Box from '@material-ui/core/Box';
import LoginPage from '.';

export default {
  title: 'Q3 UI|Components/LoginPage',
};

export const AutoImage = () => (
  <LoginPage>
    <Box>Form goes here :)</Box>
  </LoginPage>
);

export const AutoScroll = () => (
  <LoginPage>
    <Box height="350vh" style={{ backgroundColor: 'red' }}>
      Form goes here :)
    </Box>
  </LoginPage>
);
