import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import App from './components/app';
import Profile from './containers/Profile';
import ProfileChangePassword from './containers/ProfileChangePassword';
import Socket from './containers/Socket';
import { usePages } from './hooks';
import * as Templates from './templates';

export const goTo = (path) => () => navigate(path);

export { Templates };

export const withAdminProviders = (Template) => ({
  icons,
  socket,
  tours,
  children,
  profileItems,
  AppProps,
  NavProps,
  ProfileProps,
  SocketProps,
}) => {
  const menuItems = usePages(AppProps.pages, icons);

  return (
    <Socket {...SocketProps}>
      <Template
        NavProps={{
          ...NavProps,
          menuItems,
        }}
        socket={socket}
      >
        <App {...AppProps}>
          <Profile
            path="/account/profile"
            {...ProfileProps}
          />
          <ProfileChangePassword path="/account/change-password" />
        </App>
        {children}
      </Template>
    </Socket>
  );
};

export default withAdminProviders;
