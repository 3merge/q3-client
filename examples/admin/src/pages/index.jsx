import React from 'react';
import { Router } from '@reach/router';
import Dashboard from './dashboard';
import Users from './users';

export default () => (
  <Router>
    <Dashboard path="/" />
    <Users path="/users" />
  </Router>
);
