import React from 'react';
import NotificationsDescription from '../NotificationsDescription';

const withLoadingState = (Component) => (props) => {
  // eslint-disable-next-line
  const { error, loading } = props;

  if (error)
    return (
      <NotificationsDescription text="notificationsError" />
    );

  if (loading)
    return (
      <NotificationsDescription text="notificationsLoading" />
    );

  return <Component {...props} />;
};

export default withLoadingState;
