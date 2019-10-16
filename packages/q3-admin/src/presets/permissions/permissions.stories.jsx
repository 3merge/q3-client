import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { storiesOf } from '@storybook/react';
import Permissions from './index';

const stub = {
  id: 1,
  op: 'Read',
  coll: 'q3-api-users',
  role: 'Admin',
  fields: '*',
};

const mock = new MockAdapter(Axios, {
  delayResponse: 200,
});

mock.onGet('/system').reply(200, {
  collections: {
    'q3-api-users': [
      'id',
      'name',
      'email',
      'address.streetLine1',
      'address.city',
      'address.country',
      'tel',
    ],
    'q3-api-permissions': [
      'fields',
      'ownership',
      'coll',
      'op',
      'role',
    ],
  },
  roles: ['Admin', 'Editor'],
  conditions: ['isValidated'],
});

mock.onGet('/permissions').reply(200, {
  permissions: [stub, stub, stub],
});

mock.onGet(/\/permissions\/\d+/).reply(200, {
  permission: stub,
});

mock.onPatch(/\/permissions\/\d+/).reply(200, {
  message: 'Permission has been successfully updated',
  permission: stub,
});

storiesOf('Presets|Permissions', module)
  .add('List', () => <Permissions />, {
    router: '/permissions',
  })
  .add('Detail', () => <Permissions />, {
    router: '/permissions/1',
  });
