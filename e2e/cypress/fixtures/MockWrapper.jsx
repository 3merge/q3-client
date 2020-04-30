import React from 'react';
import { useLoading } from 'q3-ui-rest';
import MockAuthenticationProvider from './MockAuthenticationProvider';
import MockRestProvider from './MockRestProvider';

const Loading = ({ children }) => {
  useLoading();
  return children;
};

export default ({ children }) => (
  <MockAuthenticationProvider>
    <MockRestProvider>
      <Loading>{children}</Loading>
    </MockRestProvider>
  </MockAuthenticationProvider>
);
