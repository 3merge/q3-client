import React from 'react';
import { storiesOf } from '@storybook/react';
import Login from './login';

storiesOf('Views|Login', module).add(
  'With custom background color',
  () => (
    <Login formProps={{ dividers: false }}>Child!</Login>
  ),
);
