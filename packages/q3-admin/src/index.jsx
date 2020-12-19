import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Box from '@material-ui/core/Box';
import { get } from 'lodash';
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

export const goTo = (path) => () => navigate(path);

const Admin = ({
  icons,
  tours,
  children,
  profileItems,
  AppProps,
  NavProps,
  ProfileProps,
  SocketProps,
}) => {
  const cls = useStyle();
  const root = get(AppProps, 'directory', '/');

  return (
    <Tours steps={tours}>
      {(restartTour) => (
        <Viewport>
          <Navigation
            {...NavProps}
            menuItems={usePages(AppProps.pages, icons)}
            root={root}
          />
          <Socket {...SocketProps}>
            <Box className={cls.main}>
              <ProfileActions
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
                  {
                    onClick: restartTour,
                    label: 'restartTour',
                  },
                ]}
              >
                <Notifications />
              </ProfileActions>
              <App {...AppProps}>
                <Profile
                  path="/account/profile"
                  {...ProfileProps}
                />
                <ProfileChangePassword path="/account/change-password" />
              </App>
              {children}
            </Box>
          </Socket>
        </Viewport>
      )}
    </Tours>
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
