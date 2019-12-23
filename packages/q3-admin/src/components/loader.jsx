import React from 'react';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useLoading } from 'q3-ui-rest/lib/axios';

const Loader = () => {
  const loading = useLoading();

  return (
    <Fade in={loading}>
      <Box
        left={0}
        top={0}
        position="fixed"
        width="100%"
        zIndex="100000"
      >
        <LinearProgress color="secondary" variant="query" />
        <Box position="absolute" right="1rem" top="1rem">
          <CircularProgress />
        </Box>
      </Box>
    </Fade>
  );
};

export default Loader;
