import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';
import AdminApp from 'q3-admin';
import AdminPrivateGateway from './AdminPrivateGateway';
import useSiteMetaData from './useSiteMetaData';

const AdminRouter = ({ AdminProps, GatekeepProps }) => {
  const { appDirectory: basepath, logo: logoSrc } =
    useSiteMetaData();

  return (
    <AdminPrivateGateway GatekeepProps={GatekeepProps}>
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
        />
      </Router>
    </AdminPrivateGateway>
  );
};

AdminRouter.defaultProps = {
  AdminProps: {},
  GatekeepProps: {},
};

AdminRouter.propTypes = {
  // eslint-disable-next-line
  AdminProps: PropTypes.object,
  // eslint-disable-next-line
  GatekeepProps: PropTypes.object,
};

export default AdminRouter;
