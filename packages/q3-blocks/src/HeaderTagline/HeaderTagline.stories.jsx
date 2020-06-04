import React from 'react';
import {
  TITLE_TEXT,
  TITLE_TEXT_LONG,
} from '../__fixtures__/dummy-content';
import HeaderTagline from './HeaderTagline';

export default {
  title: 'Q3 Blocks|Headers/Tagline',
};

export const demo = () => (
  <HeaderTagline
    tagline={TITLE_TEXT_LONG}
    title={TITLE_TEXT}
  />
);
