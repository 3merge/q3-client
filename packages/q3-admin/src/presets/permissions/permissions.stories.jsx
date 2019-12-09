import React from 'react';
import { storiesOf } from '@storybook/react';
import Auth from 'q3-ui-permissions';
import MockAPI from '../../mock';
import Permissions, { PermissionDetail } from './index';

const stub = {
  id: 1,
  op: 'Read',
  coll: 'q3-api-users',
  role: 'Admin',
  fields: '*',
  createdBy: {
    id: '23456',
  },
};

const define = (mock) => {
  mock.onGet('/system').reply(200, {
    collections: {
      'users': {
        paths: [
          'id',
          'name',
          'email',
          'address.streetLine1',
          'address.city',
          'address.country',
          'tel',
        ],
        refs: ['tel'],
      },
      'permissions': {
        paths: [
          'fields',
          'ownership',
          'coll',
          'op',
          'role',
        ],
        refs: [],
      },
    },
    roles: ['Admin', 'Editor'],
    conditions: ['isValidated'],
  });

  mock.onGet('/profile').reply(200, {
    profile: {
      id: '123456',
    },
    permissions: [
      {
        coll: 'permissions',
        fields: '*',
        op: 'Delete',
      },
      {
        coll: 'permissions',
        fields: '*, !fields',
        op: 'Create',
      },
      {
        coll: 'permissions',
        fields: 'owner*',
        op: 'Update',
        ownership: 'Own',
      },
      {
        coll: 'permissions',
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

  mock.onPatch(/\/permissions\/\d+/).reply(422, {
    message: 'Permission has failed',
    errors: {
      action: {
        msg: 'Bad',
      },
      ownership: {
        msg: 'Bad',
      },
    },
  });

  mock.onDelete(/\/permissions\/\d+/).reply(204, {
    message: 'Permission has been successfully removed',
  });

  mock.onPost('/permissions').reply(201, {
    message: 'Permission has been created',
    permission: {},
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
          <PermissionDetail id="1" />
        </Auth>
      </MockAPI>
    ),
    {
      router: '/',
    },
  );
