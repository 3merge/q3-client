import React from 'react';
import { storiesOf } from '@storybook/react';
import Auth from 'q3-ui-permissions';
import data from 'q3-ui/thread/data.json';
import MockAPI from '../../utils/mocker';
import Notes from './index';
import Detail from '../../templates/detail';

storiesOf('Presets|Notes', module)
  .add(
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

          m.onGet('/notes?topic=1').reply(200, {
            notes: data,
          });

          m.onDelete(/notes\/\d+?topic=1/).reply(204);

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
                component: () => <Notes id="1" />,
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
          m.onGet('/notes?topic=1').reply(200, {
            notes: [],
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
                component: () => <Notes id="1" />,
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
          m.onGet('/notes?topic=1').reply(500);
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
                component: () => <Notes id="1" />,
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
