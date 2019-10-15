import React from 'react';
import { Detail } from 'q3-admin/lib/templates';

export default (props) => (
  <Detail
    {...props}
    name="users"
    pathToTitle="user.name"
    views={({ post }) => [
      {
        label: 'General',
        component: () => null,
      },
      {
        to: 'about',
        label: 'About',
        component: () => {
          return 'About';
        },
      },
    ]}
  />
);
