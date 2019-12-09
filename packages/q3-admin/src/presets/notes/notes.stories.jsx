import React from 'react';
import { storiesOf } from '@storybook/react';
import Auth from 'q3-ui-permissions';
import threads from 'q3-ui/lib/thread/data.json';
import MockAPI from '../../mock';
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

          m.onGet('/orders/1/thread').reply(200, {
            threads,
          });

          m.onPut('/orders/1/thread').reply(201, {
            message: 'Note added',
            threads,
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
            resourceName="orders"
            resourceNameSingular="order"
            pathToTitle="order.po"
            views={[
              {
                to: '/',
                label: 'notes',
                component: () => <Notes path="orders/1" />,
              },
            ]}
          />
        </Auth>
      </MockAPI>
    ),
    {
      router: '/orders/1',
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
            resourceName="orders"
            resourceNameSingular="order"
            pathToTitle="order.po"
            views={[
              {
                to: '/',
                label: 'thread',
                component: () => <Notes id="1" />,
              },
            ]}
          />
        </Auth>
      </MockAPI>
    ),
    {
      to: '/',
      router: '/orders/1',
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
            resourceName="orders"
            resourceNameSingular="order"
            name="orders"
            pathToTitle="order.po"
            views={[
              {
                to: '/',
                label: 'thread',
                component: () => <Notes id="1" />,
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
