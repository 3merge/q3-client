/* eslint-disable no-console  */
import React from 'react';
import Bool from '.';

export default {
  title: 'Q3 Forms|Fields/Bool',
  parameters: {
    component: Bool,
    componentSubtitle:
      'Render a controlled checkbox, radio or switch element',
  },
};

const props = {
  name: 'foo',
  label: 'Foo',
  onChange: console.log,
};

export const Checkbox = () => (
  <Bool {...props} variant="checkbox" />
);

export const Switch = () => (
  <Bool {...props} variant="switch" />
);

export const Radio = () => (
  <Bool {...props} variant="radio" />
);

export const WithExpandedDescription = () => (
  <Bool {...props} variant="radio" helperText="radio" />
);
