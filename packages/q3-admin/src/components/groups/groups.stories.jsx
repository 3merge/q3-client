import React from 'react';
import { Groups } from '.';

export default {
  title: 'Q3 Admin|Components/Groups',
  parameters: {
    component: Groups,
    componentSubtitle:
      'Query-based tabs for segmenting data',
  },
};

export const Default = () => (
  <Groups
    search="?"
    queries={{
      Ready: 'kind=ready',
      NotReady: 'kind=notReady',
      AlmostReady: 'kind=almostReady',
    }}
  />
);

export const OnQueryMatch = () => (
  <Groups
    search="kind=notReady&sort=kind"
    queries={{
      Ready: 'kind=ready',
      NotReady: 'kind=notReady',
      AlmostReady: 'kind=almostReady',
    }}
  />
);
