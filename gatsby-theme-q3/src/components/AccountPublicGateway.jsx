import React from 'react';
import { Gatekeeper } from 'q3-admin/lib/containers';
import IsBrowserReady from './IsBrowserReady';

const AccountPublicGateway = ({ children }) => (
  <IsBrowserReady>
    <Gatekeeper redirectPathOnSession="/account">
      {children}
    </Gatekeeper>
  </IsBrowserReady>
);

export default AccountPublicGateway;
