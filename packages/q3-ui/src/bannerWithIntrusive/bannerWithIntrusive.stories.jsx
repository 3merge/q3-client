import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import BannerWithIntrusive from '.';
import fixture from '../bannerWithOffset/__fixtures__';

export default {
  title: 'Q3 UI/Components/BannerWithIntrusive',
};

const excerpt = `Best suited for excerpts and short paragraphs.
          Anything beyond 6-8 lines should use the Offset
          variant or be relocated to the main content
          container.`;

export const ExampleWithContrast = () => (
  <BannerWithIntrusive
    {...fixture}
    subtitle={
      <Typography component="div">
        <Typography variant="body1">{excerpt}</Typography>
      </Typography>
    }
  />
);

export const ExampleWithWhiteBackground = () => (
  <Box style={{ backgroundColor: '#FFF', height: '100vh' }}>
    <BannerWithIntrusive
      {...fixture}
      subtitle={
        <Typography component="div">
          <Typography variant="body1">{excerpt}</Typography>
        </Typography>
      }
    />
  </Box>
);
