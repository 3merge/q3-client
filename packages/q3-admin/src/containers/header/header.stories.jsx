import React from 'react';
import State from '../state';
import Header from '.';

export default {
  title: 'Q3 Admin/Containers/Header',
  parameters: {
    component: Header,
    componentSubtitle:
      'Admin app bar with dynamic title rendering',
  },
};

const withProvider = (Component) => (props) => (
  <State.Provider
    value={{
      resourceName: 'resources',
      resourceNameSingular: 'resource',
      id: 1,
      resource: {
        name: 'Jon',
        email: 'jon@gmail.ca',
      },
    }}
  >
    <Component {...props} />
  </State.Provider>
);

export const Default = withProvider(() => <Header />);

export const WithChildren = withProvider(() => (
  <Header>
    <p>Render</p>
  </Header>
));

export const WithCustomTitle = withProvider(() => (
  <Header titleProp="name" />
));

export const WithCustomTitleAndSubtitle = withProvider(
  () => <Header titleProp="name" subtitleProp="email" />,
);
