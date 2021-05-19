import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Box from '@material-ui/core/Box';
import { get } from 'lodash';
import { Docs } from 'q3-admin-docs';
import Hidden from '@material-ui/core/Hidden';
import App from './components/app';
import { usePages, useServerSideEvents } from './hooks';
import Notifications from './containers/Notifications';
import Navigation from './components/Navigation';
import Profile from './containers/Profile';
import ProfileChangePassword from './containers/ProfileChangePassword';
import ProfileActions from './components/ProfileActions';
import ActionBar from './components/ActionBar';
import ActionBarMobile from './components/ActionBarMobile';
import Viewport from './components/Viewport';
import useStyle from './components/useStyle';

export const goTo = (path) => () => navigate(path);

// EXPANDABLE WAY TO ADD APPS...

const Admin = ({
  icons,
  children,
  profileItems,
  AppProps,
  NavProps,
  ProfileProps,
}) => {
  const cls = useStyle();
  const root = get(AppProps, 'directory', '/');
  useServerSideEvents();

  return (
    <Viewport>
      <Navigation
        {...NavProps}
        menuItems={usePages(AppProps.pages, icons)}
        root={root}
      >
        <Box
          display="flex"
          alignItems="center"
          flex="1"
          justifyContent="flex-end"
        >
          <Notifications />
          <Hidden mdDown>
            <ProfileActions
              {...ProfileProps}
              profileItems={[
                ...profileItems,
                {
                  onClick: goTo(`${root}account/profile`),
                  label: 'profile',
                },
                {
                  onClick: goTo(
                    `${root}account/change-password`,
                  ),
                  label: 'changePassword',
                },
              ]}
            />
          </Hidden>
        </Box>
      </Navigation>
      <Box className={cls.main}>
        <ActionBar>
          <App {...AppProps}>
            <Docs path="/docs" />
            <Profile
              path="/account/profile"
              {...ProfileProps}
            />
            <ProfileChangePassword path="/account/change-password" />
          </App>
          {children}
          <ActionBarMobile />
        </ActionBar>
      </Box>
    </Viewport>
  );
};

Admin.propTypes = {
  AppProps: PropTypes.shape({
    pages: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,

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
