import React from 'react';
import { storiesOf } from '@storybook/react';
import Thread from '.';
import data from './data';

storiesOf('Components|Thread', module).add(
  'Default render',
  () => <Thread entries={data} />,
);
