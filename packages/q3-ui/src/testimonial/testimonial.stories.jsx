import React from 'react';
import { storiesOf } from '@storybook/react';
import Testimonial from '.';

storiesOf(
  'Components|Testimonial',
  module,
).add('Default render', () => (
  <Testimonial
    quote="This is a quote worth posting on the web!"
    person="Jimmy"
    position="Sales"
  />
));
