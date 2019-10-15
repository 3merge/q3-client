import React from 'react';
import { get } from 'lodash';
import Menu from 'q3-ui/lib/menu';

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
          label: 'Users',
          to: '/users',
          visible: true,
        },
      ]}
    />
    <Menu
      done={get(props, 'close')}
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
