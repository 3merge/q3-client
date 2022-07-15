import React from 'react';
import AlertAuthentication from '../AlertAuthentication';
import ThreadContext from '../ThreadContext';

const withAlertAuthentication = (Component) => {
  const AlertAuthentictionCheck = (props) =>
    React.useContext(ThreadContext).canSee ? (
      <Component {...props} />
    ) : (
      <AlertAuthentication />
    );

  return AlertAuthentictionCheck;
};

export default withAlertAuthentication;
