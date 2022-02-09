import React from 'react';
import PropTypes from 'prop-types';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsPausedIcon from '@material-ui/icons/NotificationsPaused';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';

const Bell = ({ active, error, hasItems }) => {
  if (error) return <NotificationsOffIcon />;
  if (hasItems) return <NotificationsIcon />;
  if (active) return <NotificationsActiveIcon />;
  return <NotificationsPausedIcon />;
};

Bell.propTypes = {
  active: PropTypes.bool,
  error: PropTypes.bool,
  hasItems: PropTypes.bool,
};

Bell.defaultProps = {
  active: false,
  error: false,
  hasItems: false,
};

export default Bell;
