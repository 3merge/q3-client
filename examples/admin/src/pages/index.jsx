import React from 'react';
import { Router } from '@reach/router';
import { NotFound } from 'q3-admin/lib/templates';
import { Protected } from 'q3-ui-permissions';
import { UserList, UserDetail } from './users';
import { USER_COLLECTION } from '../constants';

import Dashboard from './dashboard';

export default () => (
  <Router>
    <Dashboard path="/" />
    <Protected
      coll={USER_COLLECTION}
      component={UserList}
      path="users"
      to="/"
    />
    <Protected
      coll={USER_COLLECTION}
      component={UserDetail}
      path="users/:id/*"
      to="/"
    />
    <NotFound default />
  </Router>
);
