import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import {
  TITLE_TEXT,
  TITLE_TEXT_LONG,
} from '../__fixtures__/dummy-content';
import { URL } from '../__fixtures__/youtube';
import HeaderTaglineWithFeaturedVideo from './HeaderTaglineWithFeaturedVideo';

export default {
  title: 'Q3 Blocks|Headers/TaglineWithFeaturedVideo',
  decorators: [withA11y],
};

export const demo = () => (
  <HeaderTaglineWithFeaturedVideo
    tagline={TITLE_TEXT_LONG}
    title={TITLE_TEXT}
    youtube={URL}
    youtubeTitle="This is a video"
  />
);
