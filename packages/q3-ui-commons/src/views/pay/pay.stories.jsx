import React from 'react';
import { storiesOf } from '@storybook/react';
import MockApi from 'q3-axios-mock';
import Pay from '.';

storiesOf('Views|Pay', module).add('Default', () => {
  return (
    <MockApi>
      <Pay />
    </MockApi>
  );
});
