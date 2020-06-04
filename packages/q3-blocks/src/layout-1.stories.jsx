import React from 'react';
import Box from '@material-ui/core/Box';
import { ContentHalves, ContentVideoFeature } from '.';
import fluid from './__fixtures__/gatsby-image';
import { URL } from './__fixtures__/youtube';
import {
  TITLE_TEXT,
  ParagraphLong,
} from './__fixtures__/dummy-content';

export default {
  title: 'Q3 Blocks|Layouts/1',
};

export const demo = () => (
  <>
    <ContentHalves
      label="Foo"
      imageProps={{ alt: 'Foo', ...fluid }}
      title={TITLE_TEXT}
    >
      <ParagraphLong />
    </ContentHalves>
    <Box mt={2}>
      <ContentVideoFeature youtube={URL} />
    </Box>
  </>
);
