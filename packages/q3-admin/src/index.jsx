import React from 'react';
import EmailEditor from 'q3-ui-emaileditor';
import QueueLogs from 'q3-ui-queuelogs';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { get } from 'lodash';
import App from './components/app';
import {
  usePages,
  useServerSideEvents,
  useProfileTimezone,
  useProfileLocale,
  useProfileTheme,
} from './hooks';
import Domain from './containers/Domain';
import DomainI18n from './containers/DomainI18n';
import DomainProvider from './containers/DomainProvider';
import DomainChangeManifest from './containers/DomainChangeManifest';
import DomainChangeBrowser from './containers/DomainChangeBrowser';
import DomainChangePolicies from './containers/DomainChangePolicies';
import Profile from './containers/Profile';
import ProfileChangeContact from './containers/ProfileChangeContact';
import ProfileChangeLocale from './containers/ProfileChangeLocale';
import ProfileNotifications from './components/ProfileNotifications';
import ProfileChangePassword from './containers/ProfileChangePassword';
import ProfileChangeTheme from './containers/ProfileChangeTheme';
import Viewport from './components/Viewport';
import useStyle from './components/useStyle';
import Logo from './components/Logo';
import Navbar from './components/Navbar';
import NavbarList from './components/NavbarList';
import SystemPage from './components/SystemPage';
import SystemPageSub from './components/SystemPageSub';

export { getDomain } from './hooks/useDomain';
export * from './containers';
export * from './hooks';

const EmailModule = React.memo(() => (
  <SystemPageSub title="emailEditor" maxWidth="xl">
    <EmailEditor />
  </SystemPageSub>
));

const QueueModule = React.memo(() => (
  <SystemPageSub title="queuelogs" maxWidth="xl">
    <QueueLogs />
  </SystemPageSub>
));

const Admin = ({
  AppProps,
  ProfileChangePasswordComponent,
  ProfileNotificationsComponent,
  ProfileComponent,
}) => {
  const pages = React.useRef(AppProps.pages);
  // these should not inherit addons
  const menuItems = usePages(pages.current);
  const cls = useStyle();

  useProfileLocale();
  useProfileTimezone();
  useProfileTheme();
  useServerSideEvents();

  return (
    <DomainProvider>
      <Viewport>
        <Navbar
          header={
            <Logo to={get(AppProps, 'directory', '/')} />
          }
        >
          <NavbarList items={menuItems} />
        </Navbar>
        <Box className={cls.main}>
          <App {...AppProps}>
            <SystemPage path="account">
              <ProfileChangeContact path="contact" />
              <ProfileChangeLocale path="locale" />
              <ProfileChangeTheme path="theme" />
              <ProfileNotificationsComponent path="notifications" />
              <ProfileChangePasswordComponent path="password" />
              <ProfileComponent default />
            </SystemPage>
            <SystemPage path="system">
              <DomainChangeBrowser path="browser" />
              <DomainChangeManifest path="manifest" />
              <DomainChangePolicies path="policies" />
              <DomainI18n path="i18n" />
              <EmailModule path="emails" />
              <QueueModule path="queues" />
              <Domain default />
            </SystemPage>
          </App>
        </Box>
      </Viewport>
    </DomainProvider>
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
  ProfileComponent: PropTypes.func,
  ProfileChangePasswordComponent: PropTypes.func,
  ProfileNotificationsComponent: PropTypes.func,
};

Admin.defaultProps = {
  ProfileComponent: Profile,
  ProfileChangePasswordComponent: ProfileChangePassword,
  ProfileNotificationsComponent: ProfileNotifications,
};

export default Admin;
