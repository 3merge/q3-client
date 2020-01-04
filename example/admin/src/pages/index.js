import React from 'react';
import Locations from './locations';
import Permissions from './permissions';

export default [
  {
    home: true,
    component: () => <p>Home</p>,
  },
  {
    index: true,
    component: Locations,
    collectionName: 'locations',
    resourceName: 'locations',
    resourceNameSingular: 'location',
    group: 'Commons',
  },
  {
    index: true,
    component: Permissions,
    resourceName: 'permissions',
    resourceNameSingular: 'permission',
    collectionName: 'q3-api-permissions',
    group: 'Commons',
  },
];
