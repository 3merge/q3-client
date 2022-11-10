import React from 'react';
import PropTypes from 'prop-types';
// import Notifications from 'q3-ui-notifications';
import Dialog from 'q3-ui-dialog';
import NotificationsButton from '../NotificationsButton';
import useNotificationsPage from '../../hooks/useNotificationsPage';

const Notifications = () => {
  const { visit } = useNotificationsPage();

  return (
    <Dialog
      renderContent={() => null}
      renderTrigger={(onClick) => (
        <NotificationsButton onClick={onClick} />
      )}
      title="notifications"
      variant="drawer"
    />
  );
};

export default Notifications;
