import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import Chart from './Chart';

export default {
  title: 'Components|Chart',
  decorators: [withA11y, withKnobs],
  parameters: {
    component: Chart,
    componentSubtitle:
      'Embedded iFrame visualization tiles (intended for MongoDB charts)',
  },
};

export const WithDefaultDateRange = () => (
  <Chart
    url="//datawrapper.dwcdn.net/Wa2Ci/17/"
    title="Sample DB"
    filters={{
      from: new Date(),
      to: new Date(),
    }}
  />
);
