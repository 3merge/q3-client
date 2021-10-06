import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Box from '@material-ui/core/Box';
import { get } from 'lodash';
import App from './components/app';
import { usePages, useServerSideEvents } from './hooks';
import Notifications from './containers/Notifications';
import Navigation from './components/Navigation';
import Profile from './containers/Profile';
import Documentation from './components/Documentation';
import ProfileChangePassword from './containers/ProfileChangePassword';
import ProfileActions from './components/ProfileActions';
import Viewport from './components/Viewport';
import useStyle from './components/useStyle';
import mergeAddonsWithPages from './helpers/mergeAddonsWithPages';

export const goTo = (path) => () => navigate(path);

const Admin = ({
  // eslint-disable-next-line
  children,
  profileItems,
  AppProps,
  // eslint-disable-next-line
  NavProps,
  // eslint-disable-next-line
  ProfileProps,
}) => {
  const pages = React.useRef(AppProps.pages);
  const cls = useStyle();
  const root = get(AppProps, 'directory', '/');

  useServerSideEvents();

  Object.assign(AppProps, {
    pages: mergeAddonsWithPages(
      pages.current,
      AppProps.addons,
    ),
  });

  const goToWithRoot = (xs) =>
    goTo(
      [root, xs].join('/').replace(/([^:]\/)\/+/g, '$1'),
    );

  const standardProfileMenuItems = [
    {
      component: Profile,
      label: 'profile',
      path: '/account/profile',
      ...ProfileProps,
    },
    {
      component: ProfileChangePassword,
      label: 'changePassword',
      path: '/account/change-password',
    },
  ];

  return (
    <Viewport>
      <Navigation
        {...NavProps}
        menuItems={usePages(AppProps.pages)}
        root={root}
      >
        <ProfileActions
          {...ProfileProps}
          profileItems={[...profileItems].concat(
            standardProfileMenuItems.map((item) => ({
              onClick: goToWithRoot(item.path),
              label: item.label,
            })),
          )}
        >
          <Notifications />
          <Documentation
            id={get(AppProps, 'documentationWidgetId')}
          />
        </ProfileActions>
      </Navigation>
      <Box className={cls.main}>
        <App {...AppProps}>
          {standardProfileMenuItems.map(
            ({ component: Component, path }) => (
              <Component key={path} path={path} />
            ),
          )}
        </App>
        {children}
      </Box>
    </Viewport>
  );
};

Admin.propTypes = {
  AppProps: PropTypes.shape({
    addons: PropTypes.arrayOf(PropTypes.object),
    pages: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,

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
  profileItems: [],
};

export default Admin;
