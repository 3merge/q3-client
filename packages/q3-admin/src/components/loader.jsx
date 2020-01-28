import React from 'react';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useLoading } from 'q3-ui-rest';

const Loader = () => {
  const loading = useLoading();

  return (
    <Fade in={loading}>
      <Box
        left={0}
        top={0}
        right={0}
        position="fixed"
        zIndex="100000"
      >
        <LinearProgress color="primary" />
      </Box>
    </Fade>
  );
};

export default Loader;
