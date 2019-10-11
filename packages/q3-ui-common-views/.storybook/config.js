import React from 'react';
import {
  configure,
  addParameters,
  addDecorator,
} from '@storybook/react';
import Provider from 'q3-ui';

const req = require.context(
  '../src',
  true,
  /.stories.jsx$/,
);

const loader = () => req.keys().forEach(req);

addDecorator((story) => (
  <Provider>
    {story()}
  </Provider>
));

configure(loader, module);
