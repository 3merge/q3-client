import React from 'react';
import { storiesOf } from '@storybook/react';
import Login from '.';

storiesOf('Views|Login', module).add('Default', () => (
  <Login onSubmit={() => null} />
));
