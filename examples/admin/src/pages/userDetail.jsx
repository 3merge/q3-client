import React from 'react';
import { Templates } from 'q3-admin';

export default (props) => (
  <Templates.Detail
    {...props}
    name="users"
    pathToTitle="user.name"
    views={() => [
      {
        label: 'General',
        component: () => {
          return 'General';
        },
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
