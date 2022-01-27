import React from 'react';
import PropTypes from 'prop-types';
import { Box, Hidden } from '@material-ui/core';
import { get } from 'lodash';
import Dialog from 'q3-ui-dialog';
import App from './components/app';
import { usePages, useServerSideEvents } from './hooks';
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
import Appbar from './components/Appbar';
import BottomActionSheet from './components/BottomActionSheet';
import Logo from './components/Logo';
import Navbar from './components/Navbar';
import NavbarList from './components/NavbarList';

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
  // this goes to logo
  const root = get(AppProps, 'directory', '/');

  useServerSideEvents();

  Object.assign(AppProps, {
    pages: mergeAddonsWithPages(
      pages.current,
      AppProps.addons,
    ),
  });

  const menuItems = usePages(AppProps.pages);

  const ProfileElement = React.useMemo(
    () => <ProfileActions {...ProfileActionsProps} />,
    [],
  );

  const NavbarListElement = React.useMemo(
    () => <NavbarList items={menuItems} />,
    [menuItems],
  );

  return (
    <Viewport>
      <Dialog
        PaperProps={{
          style: {
            maxWidth: '320px',
          },
        }}
        title="menu"
        closeOnRouteChange
        variant="drawer"
        anchor="left"
        renderContent={() => NavbarListElement}
        // renderTrigger={(onClick) => (
        //   <Appbar
        //     onClick={onClick}
        //     logo={<Logo src={NavProps.logoSrc} />}
        //   >
        //     {ProfileElement}
        //   </Appbar>
        // )}
        renderTrigger={() => null}
      />
      <BottomActionSheet />
      <Hidden mdDown>
        <Navbar footer={ProfileElement}>
          <Logo src={NavProps.logoSrc} />
          {NavbarListElement}
        </Navbar>
      </Hidden>
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
