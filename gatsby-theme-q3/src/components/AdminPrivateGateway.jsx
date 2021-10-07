import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { Gatekeeper } from 'q3-admin/lib/containers';
import IsBrowserReady from './IsBrowserReady';

const AdminPrivateGateway = ({
  children,
  GatekeepProps,
  // for legacy purposes (for now)
  ...rest
}) => (
  <IsBrowserReady>
    <Gatekeeper
      navigate={navigate}
      redirectPathOnPublic="/login"
      {...rest}
      {...GatekeepProps}
    >
      {children}
    </Gatekeeper>
  </IsBrowserReady>
);

AdminPrivateGateway.defaultProps = {
  GatekeepProps: {},
  children: null,
};

AdminPrivateGateway.propTypes = {
  GatekeepProps: PropTypes.shape({
    redirectCheck: PropTypes.func,
  }),
  children: PropTypes.node,
};

export default AdminPrivateGateway;
