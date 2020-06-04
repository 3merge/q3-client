import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import ContentVideoFeature from './ContentVideoFeature';
import { URL } from '../__fixtures__/youtube';

export default {
  title: 'Q3 Blocks|Contents/VideoFeature',
  decorators: [withA11y, withKnobs],
};

export const withModal = () => (
  <ContentVideoFeature youtube={URL} />
);
