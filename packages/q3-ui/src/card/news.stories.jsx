import React from 'react';
import News from './news';

export default {
  title: 'Components/Card/News',
  parameters: {
    component: News,
    componentSubtitle: 'Card component used for articles',
  },
};

const getProps = () => ({
  date: new Date().toISOString(),
  title: 'Our first card',
  description:
    'A small blur of text that will wrap onto the second line',
  name: 'Overline',
  label: 'Badge!',
  fluid: {
    src:
      'https://images.unsplash.com/photo-1580579180004-78e804547550?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
  to: '/',
});

export const WithAllProps = () => <News {...getProps()} />;
export const WithoutImage = () => {
  const props = getProps();
  // eslint-disable-next-line
  delete props.fluid;

  return <News {...props} />;
};

export const WithoutImageAndRibbon = () => {
  const props = getProps();
  // eslint-disable-next-line
  delete props.imgSrc;
  // eslint-disable-next-line
  delete props.label;

  return <News {...props} />;
};
