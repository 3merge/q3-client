import React from 'react';
import { storiesOf } from '@storybook/react';
import MockApi from 'q3-axios-mock';
import Auth from 'q3-ui-permissions';
import FormBuilder from '../../helpers';
import AddressSchema, { initialData } from '.';

const permissionMock = (m) => {
  m.onGet('/profile').reply(200, {
    permissions: [
      {
        coll: 'foo',
        fields: '*',
        op: 'Update',
      },
      {
        coll: 'foo',
        fields: '*',
        op: 'Read',
      },
    ],
  });
};

storiesOf('Schemas|Address', module).add('Default', () => (
  <MockApi define={permissionMock}>
    <Auth>
      <FormBuilder
        title="Address Schema"
        collectionName="foo"
        schema={AddressSchema[0]}
        data={initialData[0]}
      />
    </Auth>
  </MockApi>
));
