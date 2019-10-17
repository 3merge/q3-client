import React from 'react';
import { storiesOf } from '@storybook/react';
import Auth from 'q3-ui-permissions';
import MockAPI from '../../utils/mocker';
import Permissions from './index';

const stub = {
  id: 1,
  op: 'Read',
  coll: 'q3-api-users',
  role: 'Admin',
  fields: '*',
};

const define = (mock) => {
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
        fields: '*, !fields',
        op: 'Create',
      },
      {
        coll: 'q3-api-permissions',
        fields: '*',
        op: 'Update',
      },
      {
        coll: 'q3-api-permissions',
        fields: '*, !fields',
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

  return mock;
};

storiesOf('Presets|Permissions', module)
  .add(
    'List',
    () => (
      <MockAPI define={define}>
        <Auth>
          <Permissions />
        </Auth>
      </MockAPI>
    ),
    {
      router: '/permissions',
    },
  )
  .add(
    'Detail',
    () => (
      <MockAPI define={define}>
        <Auth>
          <Permissions />
        </Auth>
      </MockAPI>
    ),
    {
      router: '/permissions/1',
    },
  );
