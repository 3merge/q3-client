import React from 'react';
import Notifications from 'q3-ui-notifications';
import { useNotifications } from '../../hooks';

const NotificationsContainer = () => {
  const { acknowledge, data, error } = useNotifications();

  return (
    <Notifications
      data={data}
      error={error}
      // we'll handle both the same way for now
      onClick={acknowledge}
      onView={acknowledge}
    />
  );
};

export default React.memo(NotificationsContainer);
