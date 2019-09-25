import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import imgSrc from '../../static/ready.png';
import { FeaturedPhotoBanner, FullWidthBanner } from '.';
import docs from './README.md';

storiesOf('Components|Banner', module)
  .addParameters({
    jest: ['banner'],
    readme: {
      sidebar: docs,
    },
  })
  .add('Featured Photo', () => (
    <FeaturedPhotoBanner
      title="Render with a featured photo"
      subtitle="This is a subtitle! It will auto-wrap inside the container, so feel free to write a paragraph."
      imgSrc={imgSrc}
      style={{
        backgroundColor: '#FFF',
      }}
    >
      <Box my={2}>
        <Button variant="contained">Hey!</Button>
      </Box>
    </FeaturedPhotoBanner>
  ))
  .add('Full-Width', () => (
    <FullWidthBanner
      title="Render with a featured photo"
      subtitle="This is a subtitle! It will auto-wrap inside the container, so feel free to write a paragraph."
      style={{
        backgroundColor: '#DDD',
      }}
    >
      <Box my={2}>
        <Button variant="contained">Hey!</Button>
      </Box>
    </FullWidthBanner>
  ));
