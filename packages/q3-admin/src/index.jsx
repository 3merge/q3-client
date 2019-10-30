import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Redirect, Router } from '@reach/router';
import { useTranslation } from 'react-i18next';
import Providers from 'q3-ui';
import init, {
  Login,
  PasswordReset,
  Reverify,
  Verify,
} from 'q3-ui-commons';
import SnackbarProvider from 'q3-ui-forms';
import Authentication, {
  authenticate,
  destroySession,
  validateAccountEmail,
  resetPassword,
  verify,
  reverify,
} from 'q3-ui-permissions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import * as Templates from './templates';

const { Public } = Templates;

export const ApplicationGate = ({
  name,
  logoImgSrc,
  appIndex,
  appNav,
  postAuthVerification,
  popoutMenuItems,
}) => {
  const { t } = useTranslation();
  React.useEffect(init, []);

  const links = [
    {
      to: '/login',
      label: t('labels:login'),
      render: () => (
        <>
          <Login
            onSubmit={authenticate}
            onCheck={validateAccountEmail}
          />
          <Box textAlign="center" my={-2}>
            <Button component={Link} to="/reset-password">
              Forgot password?
            </Button>
          </Box>
        </>
      ),
    },
    {
      to: '/reset-password',
      label: t('labels:passwordReset'),
      render: () => (
        <>
          <PasswordReset onSubmit={resetPassword} />
          <Box textAlign="center" my={-2}>
            <Button component={Link} to="/login">
              Return to login
            </Button>
          </Box>
        </>
      ),
    },
    {
      to: '/verify',
      label: t('labels:verify'),
      render: () => <Verify onSubmit={verify} />,
    },
    {
      to: '/reverify',
      label: t('labels:reverify'),
      render: () => <Reverify onSubmit={reverify} />,
    },
  ];

  return (
    <Authentication
      loading={CircularProgress}
      renderPrivate={(args) => {
        if (postAuthVerification) {
          postAuthVerification(args);
        }

        const { firstName, photo } = args;
        return (
          <Templates.Main
            name={name}
            renderAside={appNav}
            render={appIndex}
            ProfileBarProps={{
              offcanvas: appNav,
              companyName: name,
              name: firstName,
              imgSrc: photo,
              menuItems: [
                ...popoutMenuItems,
                {
                  onClick: destroySession,
                  label: 'Logout',
                },
              ],
            }}
          />
        );
      }}
      renderPublic={() => (
        <Public
          companyName={name}
          links={links}
          logo={logoImgSrc}
        >
          <Router>
            {links.map(({ render: Renderer, ...rest }) => (
              <Renderer key={rest.to} path={rest.to} />
            ))}
            <Redirect noThrow from="/*" to="login" />
          </Router>
        </Public>
      )}
    />
  );
};

ApplicationGate.propTypes = {
  name: PropTypes.string.isRequired,
  logoImgSrc: PropTypes.string.isRequired,
  popoutMenuItems: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
    }),
  ),
};

ApplicationGate.defaultProps = {
  popoutMenuItems: [],
};

export default ({ children }) => (
  <Providers>
    <SnackbarProvider>{children}</SnackbarProvider>
  </Providers>
);
