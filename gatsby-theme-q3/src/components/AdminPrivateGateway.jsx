import React from 'react';
import { Gatekeeper } from 'q3-admin/lib/containers';
import IsBrowserReady from './IsBrowserReady';

const AdminPrivateGateway = ({ children, ...rest }) => (
  <IsBrowserReady>
    <Gatekeeper redirectPathOnPublic="/login" {...rest}>
      {children}
    </Gatekeeper>
  </IsBrowserReady>
);

export default AdminPrivateGateway;
