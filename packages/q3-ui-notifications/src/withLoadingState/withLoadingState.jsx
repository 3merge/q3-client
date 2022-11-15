import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';
import { size } from 'lodash';
import NotificationsDescription from '../NotificationsDescription';

const withLoadingState = (Component) => (props) => {
  // eslint-disable-next-line
  const { data, error, loading, showConnectivityError } =
    props;

  const msgs = size(data);

  if (error && !msgs)
    return (
      <NotificationsDescription text="notificationsError" />
    );

  if (loading)
    return (
      <Box p={2}>
        <CircularProgress />
      </Box>
    );

  return <Component {...props} />;
};

export default withLoadingState;
