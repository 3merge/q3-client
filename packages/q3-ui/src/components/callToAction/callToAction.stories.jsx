import React from 'react';
import { storiesOf } from '@storybook/react';
import CallToAction from '.';

storiesOf('Components|Call to Action', module).add(
  'Default',
  () => (
    <CallToAction
      title="This is my call to action"
      description="To change the background color, nest it inside the Wrapper component. You don't have to worry about the width of the parent container, as this sets its own breakpoints."
      to="/"
      buttonText="Call now"
    />
  ),
);
