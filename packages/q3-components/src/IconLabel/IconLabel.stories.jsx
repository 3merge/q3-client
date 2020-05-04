import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import AccountBox from '@material-ui/icons/AccountBox';
import IconLabel from './IconLabel';

export default {
  title: 'Components|IconLabel',
  decorators: [withA11y, withKnobs],
  parameters: {
    component: IconLabel,
    componentSubtitle: 'Horizonal icon-label display',
  },
};

export const withIcon = () => (
  <IconLabel icon={AccountBox} label="lorem">
    Anything else
  </IconLabel>
);
