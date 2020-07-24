import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => (
  <Box
    p={6}
    display="flex"
    height="100%"
    width="100%"
    alignItems="center"
    justifyContent="center"
  >
    <CircularProgress />
  </Box>
);

Loading.propTypes = {};
Loading.defaultProps = {};

export default Loading;
