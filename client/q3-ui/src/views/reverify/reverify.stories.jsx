import React from 'react';
import { storiesOf } from '@storybook/react';
import Reverify from '.';

storiesOf('Views|Reverify', module).add('Default', () => (
  <Reverify onSubmit={() => null} />
));
