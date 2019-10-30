import React from 'react';
import { storiesOf } from '@storybook/react';
import Auth from 'q3-ui-permissions';
import MockAPI from '../../utils/mocker';
import Detail from '../../templates/detail';
import Files from './index';
import uploads from './data.json';

storiesOf('Presets|Files', module).add(
  'Threaded',
  () => (
    <MockAPI
      define={(m) => {
        m.onGet('/profile').reply(200, {
          profile: {
            id: 'abc',
          },
          permissions: [
            {
              coll: 'q3-api-notes',
              fields: '*',
              op: 'Delete',
            },
          ],
        });

        m.onGet('/orders/1/uploads').reply(200, {
          uploads,
        });

        m.onDelete(/uploads\/\d+/).reply(204);

        m.onGet('/orders/1').reply(200, {
          order: {
            po: 'Fake order with files',
          },
        });
      }}
    >
      <Auth>
        <Detail
          id="1"
          name="orders"
          resourceName="order"
          pathToTitle="order.po"
          views={[
            {
              to: '/',
              label: 'notes',
              component: () => <Files path="/orders/1" />,
            },
          ]}
        />
      </Auth>
    </MockAPI>
  ),
  {
    router: '/orders/1',
  },
);
