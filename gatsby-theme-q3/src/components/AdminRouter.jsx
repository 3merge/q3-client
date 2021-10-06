import React from 'react';
import PropTypes from 'prop-types';
import { Gatekeeper } from 'q3-admin/lib/containers';
import { Router } from '@reach/router';
import AdminApp from 'q3-admin';
import { navigate } from 'gatsby';
import IsBrowserReady from './IsBrowserReady';
import useAppDirectory from './useAppDirectory';
import useAppLogo from './useAppLogo';
import SearchEngine from './SearchEngine';

const AdminRouter = ({
  children,
  AdminProps,
  GatekeepProps,
}) => {
  const basepath = useAppDirectory();
  const logoSrc = useAppLogo();

  return (
    <IsBrowserReady>
      <SearchEngine />
      <Gatekeeper
        navigate={navigate}
        redirectPathOnPublic="/login"
        {...GatekeepProps}
      >
        <Router basepath={basepath}>
          <AdminApp
            {...AdminProps}
            path="*"
            AppProps={{
              directory: basepath,
              ...AdminProps?.AppProps,
            }}
            NavProps={{
              logoSrc,
              ...AdminProps?.NavProps,
            }}
          >
            {children}
          </AdminApp>
        </Router>
      </Gatekeeper>
    </IsBrowserReady>
  );
};

AdminRouter.defaultProps = {
  AdminProps: {},
  GatekeepProps: {},
  children: null,
};

AdminRouter.propTypes = {
  // eslint-disable-next-line
  AdminProps: PropTypes.object,
  // eslint-disable-next-line
  GatekeepProps: PropTypes.object,
  children: PropTypes.node,
};

export default AdminRouter;
