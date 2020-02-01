import React from 'react';
import Resource from './resource';

export default {
  title: 'Components/Card/Resource',
  parameters: {
    component: Resource,
    componentSubtitle: 'Card component used for resources',
  },
};

const getProps = (args) => ({
  name: 'Components',
  title: 'New resource card',
  description: 'Great for homepages and resource pages',
  to: '/',
  buttonText: 'First',
  secondaryTo: '/',
  secondaryButtonText: 'Second',
  imgSrc:
    'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png',
  ...args,
});

export const WithTwoButtons = () => (
  <Resource {...getProps()} />
);
