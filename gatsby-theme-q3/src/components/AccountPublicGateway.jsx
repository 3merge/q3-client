import React from 'react';
import { navigate } from 'gatsby';
import { Gatekeeper } from 'q3-admin/lib/containers';
import IsBrowserReady from './IsBrowserReady';

// eslint-disable-next-line
const AccountPublicGateway = ({ children }) => (
  <IsBrowserReady>
    <Gatekeeper
      navigate={navigate}
      redirectPathOnSession="/account"
    >
      {children}
    </Gatekeeper>
  </IsBrowserReady>
);

export default AccountPublicGateway;
