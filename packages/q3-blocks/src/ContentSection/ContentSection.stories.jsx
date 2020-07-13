import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { Files, Missing } from 'q3-ui-assets';
import {
  TITLE_TEXT,
  TITLE_TEXT_LONG,
  TITLE_TEXT_SHORT,
  DESCRIPTION,
  ParagraphLong,
} from '../__fixtures__/dummy-content';
import ContentSection from './ContentSection';
import ContentSectionHeader from '../ContentSectionHeader';
import ContentSectionWithRepeatableFeatures from '../ContentSectionWithRepeatableFeatures';
import FeatureWithGraphic from '../FeatureWithGraphic';

export default {
  title: 'Q3 Blocks|Contents/SectionHeader',
  decorators: [withA11y],
};

export const Base = () => (
  <ContentSection center>
    <ContentSectionHeader
      label={TITLE_TEXT_SHORT}
      subtitle={TITLE_TEXT_LONG}
      title={TITLE_TEXT}
    />
    <ParagraphLong />
  </ContentSection>
);

export const WithRepeatableFeatures = () => (
  <ContentSectionWithRepeatableFeatures
    disableDividers
    subtitle={TITLE_TEXT_LONG}
    title={TITLE_TEXT}
    featureComponent={FeatureWithGraphic}
    featureGridProps={{
      md: 3,
      sm: 4,
      xs: 6,
    }}
    features={[
      {
        title: TITLE_TEXT,
        description: DESCRIPTION,
        graphic: Files,
      },
      {
        title: TITLE_TEXT,
        description: DESCRIPTION,
        graphic: Missing,
      },
      {
        title: TITLE_TEXT,
        description: DESCRIPTION,
        graphic: Missing,
      },
      {
        title: TITLE_TEXT,
        description: DESCRIPTION,
        graphic: Missing,
      },
      {
        title: TITLE_TEXT,
        description: DESCRIPTION,
        graphic: Missing,
      },
    ]}
  />
);
