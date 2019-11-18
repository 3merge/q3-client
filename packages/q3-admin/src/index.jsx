import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Router } from '@reach/router';
import Providers from 'q3-ui';
import init from 'q3-ui-commons';
import {
  Login,
  PasswordReset,
  Reverify,
  Verify,
} from 'q3-ui-commons/lib/views';
import SnackbarProvider from 'q3-ui-forms';
import Authentication, {
  destroySession,
} from 'q3-ui-permissions';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  React.useEffect(init, []);

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
        <Public companyName={name} logo={logoImgSrc}>
          <Router>
            <Login path="/login" />
            <PasswordReset path="/reset-password" />
            <Verify path="/verify" />
            <Reverify path="/reverify" />
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
