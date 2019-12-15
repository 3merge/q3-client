import React from 'react';
import { Router } from '@reach/router';
import { storiesOf } from '@storybook/react';
import Rebates from './index';
import JSON from './__api.json';
import { ApplicationGate } from '../..';
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
    <ApplicationGate
      name="3merge"
      logoImgSrc="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
      appIndex={() => (
        <Router>
          <Rebates
            path="rebates/*"
            resourceName="rebates"
            resourceNameSingular="rebate"
            collectionName="rebates"
          />
        </Router>
      )}
      appNav={() => null}
    />
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
