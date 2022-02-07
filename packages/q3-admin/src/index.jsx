import React from 'react';
import EmailEditor from 'q3-ui-emaileditor';
import QueueLogs from 'q3-ui-queuelogs';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { get } from 'lodash';
import App from './components/app';
import { usePages, useServerSideEvents } from './hooks';
import Profile from './containers/Profile';
import ProfileNotifications from './components/ProfileNotifications';
import ProfileChangePassword from './containers/ProfileChangePassword';
import ProfileActions from './components/ProfileActions';
import Viewport from './components/Viewport';
import useStyle from './components/useStyle';
import mergeAddonsWithPages from './helpers/mergeAddonsWithPages';
import Logo from './components/Logo';
import Navbar from './components/Navbar';
import NavbarList from './components/NavbarList';
import SystemI18n from './components/SystemI18n';
import SystemInfo from './components/SystemInfo';
import SystemPage from './components/SystemPage';

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
  // these should not inherit addons
  const menuItems = usePages(pages.current);
  const cls = useStyle();

  useServerSideEvents();

  Object.assign(AppProps, {
    pages: mergeAddonsWithPages(pages.current, [
      EmailEditor,
      QueueLogs,
    ]),
  });

  return (
    <Viewport>
      <Navbar
        footer={
          <ProfileActions
            {...NavProps}
            {...ProfileActionsProps}
          />
        }
        header={
          <Logo
            className={NavProps.className}
            src={NavProps.logoSrc}
            to={get(AppProps, 'directory', '/')}
          />
        }
      >
        <NavbarList items={menuItems} />
      </Navbar>
      <Box className={cls.main}>
        <App {...AppProps}>
          <SystemPage
            path="account"
            tabs={[
              {
                label: 'info',
                to: '/account',
              },
              {
                label: 'notifications',
                to: '/account/notifications',
              },
              {
                label: 'password',
                to: '/account/password',
              },
            ]}
            title="profile"
          >
            <ProfileNotificationsComponent path="notifications" />
            <ProfileChangePasswordComponent path="password" />
            <ProfileComponent default />
          </SystemPage>
          <SystemPage
            path="system"
            tabs={[
              {
                label: 'info',
                to: '/system',
              },
              {
                label: 'emails',
                to: '/system/emails',
              },
              {
                label: 'language',
                to: '/system/i18n',
              },
              {
                label: 'queues',
                to: '/system/queues',
              },
            ]}
            title="system"
          >
            <SystemI18n path="i18n" />
            <EmailEditor path="emails" />
            <QueueLogs path="queues" />
            <SystemInfo default />
          </SystemPage>
        </App>
      </Box>
    </Viewport>
  );
};

Admin.propTypes = {
  AppProps: PropTypes.shape({
    directory: PropTypes.string,
    pages: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
      ]),
    ),
  }).isRequired,

  NavProps: PropTypes.shape({
    brand: PropTypes.string,
    className: PropTypes.string,
    faviconSrc: PropTypes.string,
    logoSrc: PropTypes.string,
  }),

  ProfileActionsProps: PropTypes.shape({}),
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
