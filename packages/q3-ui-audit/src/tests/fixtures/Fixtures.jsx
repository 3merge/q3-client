import React from 'react';
import AuthSource from './AuthSource';
import RestSource from './RestSource';

// eslint-disable-next-line
export default ({ children }) => (
  <RestSource>
    <AuthSource>{children}</AuthSource>
  </RestSource>
);
