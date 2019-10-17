import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { storiesOf } from '@storybook/react';
import Auth from 'q3-ui-permissions';
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

mock.onGet('/profile').reply(200, {
  permissions: [
    {
      coll: 'q3-api-permissions',
      fields: '*, !role, !condition',
      op: 'Update',
    },
    {
      coll: 'q3-api-permissions',
      fields: '*',
      op: 'Read',
    },
  ],
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

mock.onDelete(/\/permissions\/\d+/).reply(204, {
  message: 'Permission has been successfully removed',
});

mock.onPost('/permissions').reply(201, {
  message: 'Permission has been created',
});

storiesOf('Presets|Permissions', module)
  .add(
    'List',
    () => (
      <Auth>
        <Permissions />
      </Auth>
    ),
    {
      router: '/permissions',
    },
  )
  .add(
    'Detail',
    () => (
      <Auth>
        <Permissions />
      </Auth>
    ),
    {
      router: '/permissions/1',
    },
  );
