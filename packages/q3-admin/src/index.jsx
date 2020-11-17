import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Box from '@material-ui/core/Box';
import { get } from 'lodash';
import Hidden from '@material-ui/core/Hidden';
import App from './components/app';
import { usePages } from './hooks';
import Notifications from './containers/Notifications';
import Tours from './containers/tour';
import Navigation from './components/Navigation';
import Profile from './containers/Profile';
import ProfileChangePassword from './containers/ProfileChangePassword';
import Socket from './containers/Socket';
import ProfileActions from './components/ProfileActions';
import Viewport from './components/Viewport';
import useStyle from './components/useStyle';
import * as Search from './components/Search';
import Tray from './components/Tray';
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

const Admin = ({
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
      <Templates.App.Stack
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
      </Templates.App.Stack>
    </Socket>
  );
};

Admin.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  AppProps: PropTypes.shape({
    pages: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,

  socket: PropTypes.string.isRequired,

  /**
   * An array of tour steps (label, html ID, etc.).
   */
  tours: PropTypes.arrayOf(PropTypes.object),

  /**
   * Each key-value pair corresponds with a collection name and its menu icon.
   */
  icons: PropTypes.shape({}),

  /**
   * An array of actions to populate the profile dropdown menu.
   */
  profileItems: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
    }),
  ),
};

Admin.defaultProps = {
  icons: {},
  tours: [],
  profileItems: [],
};

export default Admin;
