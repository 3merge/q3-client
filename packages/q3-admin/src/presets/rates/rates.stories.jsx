import React from 'react';
import { storiesOf } from '@storybook/react';
import Auth from 'q3-ui-permissions';
import Rates from './index';
import JSON from './__api.json';
import MockAPI from '../../utils/mocker';

const Story = () => (
  <MockAPI
    define={(m) => {
      m.onGet('/profile').reply(200, JSON.profile);

      m.onGet(/^\/search/).reply(200, JSON.search);
      m.onGet(/^\/rates\/\d+/).reply(200, JSON.rate);
      m.onGet(/rates/).reply(200, JSON.rates);

      m.onPost(/rates/).reply(201, JSON.rate);
      m.onPatch(/rates/).reply(200, JSON.rate);
      m.onDelete(/rates/).reply(204);

      return m;
    }}
  >
    <Auth>
      <Rates
        name="rates"
        resourceNameSingular="rates"
        pathToTitle="rate.name"
        inheritCollectionName
        inheritResourceName
      />
    </Auth>
  </MockAPI>
);

storiesOf('Presets|Rates', module)
  .add('List', Story, {
    router: '/rates',
  })
  .add('Detail', Story, {
    router: '/rates/1',
  })
  .add('Detail (Trash)', Story, {
    router: '/rates/1/trash',
  });
