import React from 'react';
import Notification, {
  NotificationContent,
} from 'q3-ui/lib/notification';
import State from '../state';
import Header from '.';

export default {
  title: 'Q3 Admin|Containers/Header',
  parameters: {
    component: Header,
    componentSubtitle:
      'Admin app bar with dynamic title rendering',
  },
};

const withProvider = (Component, opts) => (props) => (
  <State.Provider
    value={{
      resourceName: 'resources',
      resourceNameSingular: 'resource',

      resource: {
        name: 'Jon',
        email: 'jon@gmail.ca',
      },
      ...opts,
    }}
  >
    <Component {...props} />
  </State.Provider>
);

export const Default = withProvider(() => <Header />);

export const WithChildren = withProvider(
  () => (
    <Header>
      <p>Render</p>
    </Header>
  ),
  { id: 1 },
);

export const WithCustomTitle = withProvider(
  () => <Header titleProp="name" />,
  { id: 1 },
);

export const WithCustomTitleAndSubtitle = withProvider(
  () => <Header titleProp="name" subtitleProp="email" />,
  { id: 1 },
);

export const WithRenderFunc = withProvider(
  () => (
    <Header
      titleRenderer={() => ({
        title: 'HEYY',
        subtitle: 'Inside parenthesis!',
      })}
    />
  ),
  { id: 1 },
);

export const WithFetching = withProvider(() => <Header />, {
  fetching: true,
  id: 1,
});

export const WithNotifications = withProvider(() => (
  <>
    <Header />
    <Notification
      slides={[<NotificationContent message="Hello" />]}
    />
  </>
));
