import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Slider from '.';

const getSlides = (style) => {
  const slides = [];
  for (let i = 0; i < 10; i += 1) {
    slides.push({
      id: i,
      style,
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
  ))
  .add('Custom props', () => (
    <Slider
      slidesPerView="auto"
      centeredSlides
      slides={getSlides({
        width: 150,
        height: '100%',
        background: 'red',
      })}
    />
  ));
