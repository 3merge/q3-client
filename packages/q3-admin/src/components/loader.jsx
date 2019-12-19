import React from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useLoading } from 'q3-ui-rest/lib/axios';

const Loader = () => (
  <Collapse in={useLoading()}>
    <Box left={0} top={0} position="fixed" width="100%">
      <LinearProgress color="secondary" />
      <Box position="absolute" right="1rem" top="1rem">
        <CircularProgress />
      </Box>
    </Box>
  </Collapse>
);

export default Loader;
