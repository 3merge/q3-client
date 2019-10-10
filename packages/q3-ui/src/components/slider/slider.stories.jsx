import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Slider from '.';

const getSlides = () => {
  const slides = [];
  for (let i = 0; i < 10; i += 1) {
    slides.push({
      id: i,
      Component: () => (
        <Paper>
          <Box p={4}>HEY {i + 1}</Box>
        </Paper>
      ),
    });
  }

  return slides;
};

storiesOf('Components|Slider', module)
  .add('Side buttons', () => (
    <Slider withButtons slides={getSlides()} />
  ))
  .add('Dots', () => (
    <Slider withButtons withSteppers slides={getSlides()} />
  ))
  .add('Breakpoints', () => (
    <Slider
      withSteppers
      md={2}
      lg={3}
      slides={getSlides()}
    />
  ));
