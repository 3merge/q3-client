import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { TITLE_TEXT_LONG } from '../__fixtures__/dummy-content';
import image from '../__fixtures__/gatsby-image';
import { URL } from '../__fixtures__/youtube';
import HeaderTaglineWithFeaturedVideoBackground from './HeaderTaglineWithFeaturedVideoBackground';

export default {
  title:
    'Q3 Blocks|Headers/TaglineWithFeaturedVideoBackground',
  decorators: [withA11y],
};

export const demo = () => (
  <HeaderTaglineWithFeaturedVideoBackground
    title={TITLE_TEXT_LONG}
    description={[
      TITLE_TEXT_LONG,
      TITLE_TEXT_LONG,
      TITLE_TEXT_LONG,
    ].join(' ')}
    youtube={URL}
    youtubeTitle="This is a video"
    imageProps={image}
    offset={14}
  />
);
