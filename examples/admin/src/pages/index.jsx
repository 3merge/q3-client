import React from 'react';
import { Router } from '@reach/router';
import Permission, {
  PermissionDetail,
} from 'q3-admin/lib/presets/permissions';
import { NotFound } from 'q3-admin/lib/templates';
import { Protected } from 'q3-ui-permissions';
import { UserList, UserDetail } from './users';
import {
  PERMISSION_COLLECTION,
  USER_COLLECTION,
} from '../constants';

import Dashboard from './dashboard';

export default () => (
  <Router>
    <Dashboard path="/" />
    <Protected
      coll={PERMISSION_COLLECTION}
      component={Permission}
      path="permissions"
      to="/"
    />
    <Protected
      coll={PERMISSION_COLLECTION}
      component={PermissionDetail}
      path="permissions/:id/*"
      to="/"
    />
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
