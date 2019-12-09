import React from 'react';
import { storiesOf } from '@storybook/react';
import Auth from 'q3-ui-permissions';
import data from 'q3-ui/lib/timeline/data.json';
import MockAPI from '../../mock';
import History from './index';
import Detail from '../../templates/detail';

storiesOf('Presets|History', module)
  .add(
    'Threaded',
    () => (
      <MockAPI
        define={(m) => {
          m.onGet('/versions?topic=1').reply(200, {
            versions: data,
          });

          m.onGet('/orders/1').reply(200, {
            order: {
              po: 'Fake order',
            },
          });
        }}
      >
        <Auth>
          <Detail
            id="1"
            name="orders"
            pathToTitle="order.po"
            views={[
              {
                label: 'thread',
                component: () => <History id="1" />,
              },
            ]}
          />
        </Auth>
      </MockAPI>
    ),
    {
      router: '/',
    },
  )
  .add(
    'No notes',
    () => (
      <MockAPI
        delay="2000"
        define={(m) => {
          m.onGet('/versions?topic=1').reply(200, {
            versions: [],
          });

          m.onGet('/orders/1').reply(200, {
            order: {
              po: 'Order with no results',
            },
          });
        }}
      >
        <Auth>
          <Detail
            id="1"
            name="orders"
            pathToTitle="order.po"
            views={[
              {
                label: 'thread',
                component: () => <History id="1" />,
              },
            ]}
          />
        </Auth>
      </MockAPI>
    ),
    {
      router: '/',
    },
  )
  .add(
    'Error',
    () => (
      <MockAPI
        define={(m) => {
          m.onGet('/versions?topic=1').reply(500);
          m.onGet('/orders/1').reply(200, {
            order: {
              po: 'Order with error',
            },
          });
        }}
      >
        <Auth>
          <Detail
            id="1"
            name="orders"
            pathToTitle="order.po"
            views={[
              {
                label: 'thread',
                component: () => <History id="1" />,
              },
            ]}
          />
        </Auth>
      </MockAPI>
    ),
    {
      router: '/',
    },
  );
