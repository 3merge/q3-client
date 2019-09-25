import React from 'react';
import { storiesOf } from '@storybook/react';
import Feature, { FeatureHorizontal } from '.';

storiesOf('Components|Feature', module)
  .add('Vertical', () => (
    <Feature
      align="left"
      imgSrc="https://images.unsplash.com/photo-1556912102-ea493a2a5b93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1628&q=80"
      title="This is a feature"
      body="Lem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper, justo sed pellentesque pharetra, sem nibh feugiat ipsum, ac pellentesque mauris mi at dolor"
    />
  ))
  .add('Vertical small', () => (
    <Feature
      columnSize={3}
      imgSrc="https://images.unsplash.com/photo-1556912102-ea493a2a5b93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1628&q=80"
      imageSizeSmall
      title="This is a feature"
      body="Lem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper, justo sed pellentesque pharetra, sem nibh feugiat ipsum, ac pellentesque mauris mi at dolor"
    />
  ))
  .add('Horizontal', () => (
    <FeatureHorizontal
      title="This is a feature"
      body="Lem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper, justo sed pellentesque pharetra, sem nibh feugiat ipsum, ac pellentesque mauris mi at dolor"
    />
  ));
