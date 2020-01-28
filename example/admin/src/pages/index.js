import React from 'react';
import Location from './location';
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
    subMenu: [
      {
        label: 'all',
        to: '/permissions',
      },
      {
        label: 'Public',
        to: '/permissions?role=Public',
      },
    ],
  },
  {
    id: true,
    component: Location,
    resourceName: 'locations',
    resourceNameSingular: 'location',
    collectionName: 'locations',
  },
];
