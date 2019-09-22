import React from 'react';
import { storiesOf } from '@storybook/react';
import Verify from '.';

storiesOf('Views|Verify', module).add('Default', () => (
  <Verify onSubmit={() => null} />
));
