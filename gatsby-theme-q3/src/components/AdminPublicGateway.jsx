import React from 'react';
import { Public } from 'q3-admin/lib/components';
import { Gatekeeper } from 'q3-admin/lib/containers';
import IsBrowserReady from './IsBrowserReady';

const AdminPublicGateway = ({ children, ...rest }) => (
  <IsBrowserReady>
    <Gatekeeper redirectPathOnSession="/app">
      <Public {...rest}>{children}</Public>
    </Gatekeeper>
  </IsBrowserReady>
);

export default AdminPublicGateway;
