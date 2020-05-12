import React from 'react';
import Gallery from './gallery';
import { people } from './__fixtures__';

export default {
  title: 'Q3 UI|Components/Gallery',
  parameters: {
    component: Gallery,
  },
};

export const TeamPageExample = () => (
  <Gallery photos={people} />
);

export const TeamPageExampleSmall = () => (
  <Gallery photos={people} size="small" />
);
