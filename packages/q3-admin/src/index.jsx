import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { get } from 'lodash';
import App from './components/app';
import { usePages, useServerSideEvents } from './hooks';
import Navigation from './components/Navigation';
import Profile from './containers/Profile';
import ProfileNotifications from './components/ProfileNotifications';
import ProfileChangePassword from './containers/ProfileChangePassword';
import ProfileActions from './components/ProfileActions';
import {
  NOTIFICATIONS_PATH,
  PASSWORD_PATH,
  PROFILE_PATH,
} from './components/ProfileActionsDropdown/ProfileActionsDropdown';
import Viewport from './components/Viewport';
import useStyle from './components/useStyle';
import mergeAddonsWithPages from './helpers/mergeAddonsWithPages';

export * from './containers';
export * from './hooks';

const Admin = ({
  AppProps,
  NavProps,
  ProfileActionsProps,
  ProfileChangePasswordComponent,
  ProfileNotificationsComponent,
  ProfileComponent,
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

  return (
    <Viewport>
      <Navigation
        {...NavProps}
        menuItems={usePages(AppProps.pages)}
        root={root}
      >
        <ProfileActions {...ProfileActionsProps} />
      </Navigation>
      <Box className={cls.main}>
        <App {...AppProps}>
          <ProfileComponent path={PROFILE_PATH} />
          <ProfileChangePasswordComponent
            path={PASSWORD_PATH}
          />
          <ProfileNotificationsComponent
            path={NOTIFICATIONS_PATH}
          />
        </App>
      </Box>
    </Viewport>
  );
};

Admin.propTypes = {
  AppProps: PropTypes.shape({
    addons: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
      ]),
    ),
    directory: PropTypes.string,
    pages: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
      ]),
    ),
  }).isRequired,

  NavProps: PropTypes.shape({
    logoSrc: PropTypes.string,
  }),

  ProfileActionsProps: PropTypes.shape({
    // eslint-disable-next-line
    DocumentationProps: PropTypes.object,
    includeDocumentation: PropTypes.bool,
    includeNotifications: PropTypes.bool,
    includeThemeMode: PropTypes.bool,
    includeActionsDropdown: PropTypes.bool,
  }),

  ProfileComponent: PropTypes.func,
  ProfileChangePasswordComponent: PropTypes.func,
  ProfileNotificationsComponent: PropTypes.func,
};

Admin.defaultProps = {
  NavProps: {},
  ProfileActionsProps: {},
  ProfileComponent: Profile,
  ProfileChangePasswordComponent: ProfileChangePassword,
  ProfileNotificationsComponent: ProfileNotifications,
};

export default Admin;
