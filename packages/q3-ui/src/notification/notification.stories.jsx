import React from 'react';
import Notification, { NotificationContent } from '.';

export default {
  title: 'Q3 UI|Components/Notifications',
};

export const Single = () => (
  <>
    <Notification
      slides={[
        <NotificationContent message="Hey, this is a message" />,
      ]}
    />
  </>
);

export const WithDescription = () => (
  <>
    <Notification
      slides={[
        <NotificationContent
          message="Hey, this is a message"
          description="And it has an optional description!"
        />,
      ]}
    />
  </>
);

export const Multi = () => (
  <>
    <Notification
      slides={[
        <NotificationContent message="Wow!" />,
        <NotificationContent message="Something a little less important" />,
      ]}
    />
  </>
);
