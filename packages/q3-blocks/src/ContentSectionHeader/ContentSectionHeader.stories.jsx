import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import {
  TITLE_TEXT,
  TITLE_TEXT_LONG,
  TITLE_TEXT_SHORT,
} from '../__fixtures__/dummy-content';
import ContentSectionHeader from './ContentSectionHeader';

export default {
  title: 'Q3 Blocks|Contents/SectionHeader',
  decorators: [withA11y],
};

export const Base = () => (
  <ContentSectionHeader
    label={TITLE_TEXT_SHORT}
    subtitle={TITLE_TEXT_LONG}
    title={TITLE_TEXT}
  />
);
