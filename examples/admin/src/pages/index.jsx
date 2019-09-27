import React from 'react';
import { Router } from '@reach/router';
import { Templates } from 'q3-admin';
import Dashboard from './dashboard';
import Users from './users';
import UserDetail from './userDetail';

export default () => (
  <Router>
    <Dashboard path="/" />
    <Users path="/users" />
    <UserDetail path="/users/:id/*" />
    <Templates.NotFound default />
  </Router>
);
