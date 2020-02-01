import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Slider from '.';
import Pagination from './pagination';
import Steps from './steps';

export default {
  title: 'Components/Slider',
  parameters: {
    component: Slider,
    componentSubtitle:
      'Material-UI integrated Swiper slider',
  },
};

const toggleHandlers = {
  back: () => alert('Back!'),
  next: () => alert('Next!'),
};

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
      preview:
        'https://images.unsplash.com/photo-1580540106233-135e7ad36ac4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    });
  }

  return slides;
};

export const Full = () => (
  <Slider withSteppers withButtons slides={getSlides()} />
);

export const WithButtons = () => (
  <Slider withButtons slides={getSlides()} />
);

export const WithDotSteppers = () => (
  <Slider withSteppers slides={getSlides()} />
);

export const WithThumbnailSteppers = () => (
  <Slider withThumbnails withButtons slides={getSlides()} />
);

export const IsolatedPaginationButtons = () => (
  <Pagination {...toggleHandlers} />
);

export const IsolatedStepsAsDots = () => (
  <Steps
    slides={getSlides()}
    current={1}
    withButtons
    {...toggleHandlers}
  />
);

export const IsolatedStepsAsThumbnails = () => (
  <Steps
    slides={getSlides()}
    current={1}
    withButtons
    withThumbnails
    {...toggleHandlers}
  />
);
