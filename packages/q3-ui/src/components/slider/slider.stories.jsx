import React from 'react';
import { storiesOf } from '@storybook/react';
import Slider from '.';
import { ProjectCard } from '../card';

const getSlides = () => {
  const slides = [];
  for (let i = 0; i < 10; i += 1) {
    slides.push({
      id: i,
      Component: () => (
        <ProjectCard
          fullWidth
          to="/"
          title="Test"
          name="Foo"
          buttonText="Read more"
        />
      ),
    });
  }

  return slides;
};

storiesOf('Components|Slider', module).add(
  'Default',
  () => <Slider slides={getSlides()} />,
);
