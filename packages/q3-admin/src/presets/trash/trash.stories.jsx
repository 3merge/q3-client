import React from 'react';
import { storiesOf } from '@storybook/react';
import Auth from 'q3-ui-permissions';
import MockAPI from '../../mock';
import Detail from '../../templates/detail';
import Trash from './index';

storiesOf('Presets|Trash', module).add(
  'Default',
  () => (
    <MockAPI
      define={(m) => {
        m.onGet('/profile').reply(200, {
          profile: {
            id: 'abc',
          },
          permissions: [
            {
              coll: 'q3-api-orders',
              fields: 'featuredUpload',
              op: 'Create',
            },
          ],
        });

        m.onPost('/orders/1').reply(204);
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
          resourceName="orders"
          resourceNameSingular="order"
          pathToTitle="order.po"
          views={[
            {
              to: '/trash',
              label: 'Trash',
              component: () => (
                <Trash
                  photo="https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4MzMzNDM5MF5BMl5BanBnXkFtZTgwMjQ0MDk0NDM@._V1_UX172_CR0,0,172,256_AL_.jpg"
                  path="/orders/1"
                />
              ),
            },
          ]}
        />
      </Auth>
    </MockAPI>
  ),
  {
    router: '/trash',
  },
);
