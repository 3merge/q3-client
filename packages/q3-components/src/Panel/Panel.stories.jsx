import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, select } from '@storybook/addon-knobs';

import Panel from './Panel';

export default {
  title: 'Components|Panel',
  decorators: [withA11y, withKnobs],
};

export const WithLabel = () => {
  return <Panel title="Hey">OPEN</Panel>;
};

export const WithExpandable = () => {
  return (
    <Panel title="Hey" expandable closed>
      OPEN
    </Panel>
  );
};
