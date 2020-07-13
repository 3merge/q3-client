import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import Paper from '@material-ui/core/Paper';
import img from '../__fixtures__/gatsby-image';
import ContentImageGallery from './ContentImageGallery';

export default {
  title: 'Q3 Blocks|Contents/ImageGallery',
  decorators: [withA11y, withKnobs],
};

const getImages = (num) => {
  const images = [];
  for (let i = 0; i < num; i += 1) images.push(img);
  return images;
};

export const withOverflow = () => (
  <Paper>
    <ContentImageGallery images={getImages(15)} />
  </Paper>
);

export const withMinimum = () => (
  <Paper>
    <ContentImageGallery images={getImages(5)} />
  </Paper>
);
