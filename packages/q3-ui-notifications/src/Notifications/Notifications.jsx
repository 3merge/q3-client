import React from 'react';
import PropTypes from 'prop-types';
import NotificationsList from '../NotificationsList';

const Notifications = () => {
  const data = [];
  const error = false;
  const loading = false;

  return (
    <NotificationsList
      data={data}
      error={error}
      loading={loading}
    />
  );
};

Notifications.propTypes = {};
Notifications.defaultProps = {};

export default Notifications;
