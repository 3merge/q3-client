import React from 'react';
import { Router } from '@reach/router';
import { NotFound } from 'q3-admin/lib/templates';
import Dashboard from './dashboard';
import Users from './users';
import UserDetail from './userDetail';

export default () => (
  <Router>
    <Dashboard path="/" />
    <Users path="/users" />
    <UserDetail path="/users/:id/*" />
    <NotFound default />
  </Router>
);
