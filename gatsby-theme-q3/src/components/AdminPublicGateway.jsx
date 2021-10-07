import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { Gatekeeper } from 'q3-admin/lib/containers';
import IsBrowserReady from './IsBrowserReady';

const AdminPublicGateway = ({
  children,
  GatekeepProps,
}) => (
  <IsBrowserReady>
    <Gatekeeper
      navigate={navigate}
      redirectPathOnSession="/app"
      {...GatekeepProps}
    >
      {children}
    </Gatekeeper>
  </IsBrowserReady>
);

AdminPublicGateway.defaultProps = {
  GatekeepProps: {},
  children: null,
};

AdminPublicGateway.propTypes = {
  GatekeepProps: PropTypes.shape({
    redirectCheck: PropTypes.func,
  }),
  children: PropTypes.node,
};

export default AdminPublicGateway;
