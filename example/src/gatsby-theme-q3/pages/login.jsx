import React from 'react';
import { PublicTemplate } from 'gatsby-theme-q3/src/components';
import Login from 'gatsby-theme-q3/src/pages/login';

const LoginCustom = (props) => (
  <PublicTemplate>
    <Login {...props} />
  </PublicTemplate>
);

export default LoginCustom;
