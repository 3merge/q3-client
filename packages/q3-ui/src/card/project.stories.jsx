import React from 'react';
import Project from './project';

export default {
  title: 'Components/Card/Project',
  parameters: {
    component: Project,
    componentSubtitle:
      'Card component used for project tiles',
  },
};

const getProps = (args) => ({
  name: 'Project A',
  title: 'New experiment',
  description: 'We worked day and night for three weeks',
  to: '/',
  buttonText: 'Case',
  label: 'NEW!',
  imgSrc:
    'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png',
  ...args,
});

export const AsFullWidth = () => (
  <Project {...getProps({ fullWidth: true })} />
);

export const AsContained = () => (
  <Project
    {...getProps({
      fullWidth: true,
      imgObjectFit: 'contain',
    })}
  />
);
