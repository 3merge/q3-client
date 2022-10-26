import React from 'react';
import useNotificationAnalytics from '../../hooks/useNotificationsAnalytics';

export default (Component, fn) => (props) => {
  useNotificationAnalytics(fn);
  return <Component {...props} />;
};
