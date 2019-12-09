import React from 'react';
import { storiesOf } from '@storybook/react';
import Auth from 'q3-ui-permissions';
import Rebates from './index';
import JSON from './__api.json';
import MockAPI from '../../mock';

const Story = () => (
  <MockAPI
    define={(m) => {
      m.onGet('/profile').reply(200, JSON.profile);
      m.onGet(/\/rebates\/\d+\/tiers/).reply(
        200,
        JSON.tiers,
      );

      m.onGet(/^\/search/).reply(200, JSON.search);
      m.onGet(/^\/rebates\/\d+/).reply(200, JSON.rebate);
      m.onGet(/rebates/).reply(200, JSON.rebates);
      m.onGet('/products').reply(200, JSON.products);

      m.onPost(/rebates/).reply(201);
      m.onPatch(/rebates/).reply(200);
      m.onDelete(/rebates/).reply(204);

      return m;
    }}
  >
    <Auth>
      <Rebates />
    </Auth>
  </MockAPI>
);

storiesOf('Presets|Rebates', module)
  .add('List', Story, {
    router: '/rebates',
  })
  .add('Detail', Story, {
    router: '/rebates/1',
  })
  .add('Detail (Conditions)', Story, {
    router: '/rebates/1/conditions',
  })
  .add('Detail (Tiers)', Story, {
    router: '/rebates/1/tiers',
  })
  .add('Detail (Trash)', Story, {
    router: '/rebates/1/trash',
  });
