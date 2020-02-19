import React from 'react';
import { blue } from '@material-ui/core/colors';
import Notify from '.';

export default {
  title: 'Q3 Forms|Builders/Notify',
  parameters: {
    component: Notify,
    componentSubtitle:
      'Alert-style notification bar for persistent on-screen display',
  },
};

export const WithTitle = () => (
  <Notify title="This is an on-screen notification" />
);

export const WithChildren = () => (
  <Notify title="Reserve space on the right-hand side for children">
    <span>!!!</span>
  </Notify>
);

export const WithCustomShade = () => (
  <Notify
    shade={blue}
    title="Pass it any MUI color export"
  />
);
