import React from 'react';
import Axios from 'axios';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

const Loader = () => {
  const [loading, setLoading] = React.useState();

  Axios.interceptors.request.use(
    (config) => {
      setLoading(true);
      return config;
    },
    (error) => {
      setLoading(false);
      return error;
    },
  );

  Axios.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    },
  );

  return (
    <Collapse in={loading}>
      <Box left={0} top={0} position="fixed" width="100%">
        <LinearProgress color="secondary" />
        <Box position="absolute" right="1rem" top="1rem">
          <CircularProgress />
        </Box>
      </Box>
    </Collapse>
  );
};

export default Loader;
