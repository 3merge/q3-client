import React from 'react';
import { Components } from 'q3-admin';

export default () => (
  <>
    <Components.Menu
      title="Commons"
      items={[
        {
          label: 'Dashboard',
          to: '/',
          visible: true,
        },
        {
          label: 'Users',
          to: '/users',
          visible: true,
        },
      ]}
    />
    <Components.Menu
      title="Catalogue"
      items={[
        {
          label: 'Products',
          to: '/products',
          visible: true,
        },
        {
          label: 'Categories',
          to: '/categories',
          visible: true,
        },
      ]}
    />
  </>
);
