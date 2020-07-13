import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {
  HeaderTaglineWithFeaturedVideoBackground,
  ContentSectionWithRepeatableFeatures,
  CallToActionBlock,
  Feature,
} from '.';
import {
  TITLE_TEXT,
  TITLE_TEXT_SHORT,
  TITLE_TEXT_LONG,
  DESCRIPTION,
} from './__fixtures__/dummy-content';
import image from './__fixtures__/gatsby-image';
import { URL } from './__fixtures__/youtube';

export default {
  title: 'Q3 Blocks|Layouts',
};

export const ExampleOne = () => (
  <>
    <Box>
      <HeaderTaglineWithFeaturedVideoBackground
        title={TITLE_TEXT_LONG}
        description={DESCRIPTION}
        imageProps={image}
        youtube={URL}
        youtubeTitle="Embedded video background"
      />
      <Box position="absolute">Did you know?</Box>
    </Box>
    <Box zIndex="1" position="relative" component="main">
      <Container maxWidth="xl" disableGutters>
        <Grid container>
          <CallToActionBlock backgroundColor="lightblue" />
          <CallToActionBlock
            backgroundColor="lighgreen"
            raise
          />
        </Grid>
      </Container>
    </Box>
    <ContentSectionWithRepeatableFeatures
      title={TITLE_TEXT}
      subtitle={TITLE_TEXT_LONG}
      featureComponent={Feature}
      disableDividers={false}
      align="center"
      justify="space-between"
      featureGridProps={{
        md: 5,
        sm: 6,
        xs: 12,
      }}
      features={[
        {
          title: TITLE_TEXT_SHORT,
          description: DESCRIPTION,
        },
        {
          title: TITLE_TEXT_SHORT,
          description: DESCRIPTION,
        },
      ]}
    />
  </>
);
