import React from 'react';
import PinDrop from '@material-ui/icons/PinDrop';
import AccountBox from '@material-ui/icons/AccountBox';
import Location from './location';
import Locations from './locations';
import Permissions from './permissions';
import Permission from './permission';

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
    icon: PinDrop,
  },
  {
    index: true,
    component: Permissions,
    resourceName: 'permissions',
    resourceNameSingular: 'permission',
    collectionName: 'q3-api-permissions',
    icon: AccountBox,
  },
  {
    id: true,
    component: Location,
    resourceName: 'locations',
    resourceNameSingular: 'location',
    collectionName: 'locations',
  },
  {
    id: true,
    component: Permission,
    resourceName: 'permissions',
    resourceNameSingular: 'permission',
    collectionName: 'q3-api-permissions',
  },
];
