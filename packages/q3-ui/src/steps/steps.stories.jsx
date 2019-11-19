import React from 'react';
import { storiesOf } from '@storybook/react';
import Steps from '.';

storiesOf('Components|Steps', module).add('Default', () => (
  <Steps
    steps={[
      {
        label: 'First',
        to: '/',
      },
      {
        label: 'Second',
        to: '/',
      },
      {
        label: 'Third',
        to: '/',
      },
    ]}
  />
));
