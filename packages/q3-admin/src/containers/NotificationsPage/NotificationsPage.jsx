import React from 'react';
import NotificationsList from 'q3-ui-notifications/lib/NotificationsList';
import useNotificationClickEvent from 'q3-ui-notifications/lib/useNotificationClickEvent';
import SystemPageSub from '../../components/SystemPageSub';
import { useNotifications } from '../../hooks';

const Notifications = () => {
  const { data, clear, error, loading, syncSeen } =
    useNotifications({
      numberOfDays: 365,
    });

  useNotificationClickEvent(data, syncSeen);

  return (
    <SystemPageSub title="notifications">
      <NotificationsList
        loading={loading}
        error={error}
        clear={clear}
        data={data}
      />
    </SystemPageSub>
  );
};

export default Notifications;
