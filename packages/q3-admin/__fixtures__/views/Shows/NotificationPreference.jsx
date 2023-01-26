import React from 'react';
import NotificationPreferences from '../../../src/containers/NotificationsPreferences';

export default () => (
  <>
    <NotificationPreferences
      channels={['native', 'email', 'text']}
      mine={false}
    />
    <NotificationPreferences mine={false} />
  </>
);
