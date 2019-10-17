import React from 'react';
import { get } from 'lodash';
import Menu from 'q3-ui/lib/menu';
import { useAuth } from 'q3-ui-permissions';
import {
  USER_COLLECTION,
  PERMISSION_COLLECTION,
  PRODUCT_COLLECTION,
} from './constants';

export default (props) => (
  <>
    <Menu
      done={get(props, 'close')}
      title="Commons"
      items={[
        {
          label: 'Dashboard',
          to: '/',
          visible: true,
        },
        {
          visible: useAuth(USER_COLLECTION).canSee,
          label: 'Users',
          to: '/users',
        },
        {
          visible: useAuth(PRODUCT_COLLECTION).canSee,
          label: 'Permissions',
          to: '/permissions',
        },
      ]}
    />
    <Menu
      done={get(props, 'close')}
      title="Catalogue"
      items={[
        {
          visible: useAuth(PRODUCT_COLLECTION).canSee,
          label: 'Products',
          to: '/products',
        },
      ]}
    />
  </>
);
