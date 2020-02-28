import React from 'react';
import Container from '@material-ui/core/Container';
import Resource from './resource';

export default {
  title: 'Components/Card/Resource',
  parameters: {
    component: Resource,
    componentSubtitle: 'Card component used for resources',
  },
};

const getProps = (args) => ({
  title: 'New resource card',
  description: 'Great for homepages and resource pages',
  to: '/',
  buttonText: 'First',

  imgSrc: 'https://picsum.photos/id/237/200/300',
  ...args,
});

export const WithTwoButtons = () => (
  <Container maxWidth="md">
    <Resource
      {...getProps({
        name: 'Components',
        secondaryTo: '/',
        secondaryButtonText: 'Second',
      })}
    />
  </Container>
);

export const WithLittleText = () => (
  <Container maxWidth="md">
    <Resource {...getProps()} />
  </Container>
);
