import React from 'react';
import { storiesOf } from '@storybook/react';
import CallToAction from '.';
import docs from './README.md';

storiesOf('Components|Call to Action', module)
  .addParameters({
    readme: {
      sidebar: docs,
    },
  })
  .add('Default', () => (
    <CallToAction
      title="This is my call to action"
      description="To change the background color, nest it inside the Wrapper component. You don't have to worry about the width of the parent container, as this sets its own breakpoints."
      buttonText="Call now"
      to="/"
    />
  ));
