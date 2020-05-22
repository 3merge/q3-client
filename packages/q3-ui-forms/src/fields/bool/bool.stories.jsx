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

export const SwitchDisabled = () => (
  <Bool {...props} variant="switch" disabled />
);

export const StackedBools = () => (
  <>
    <Bool
      {...props}
      variant="switch"
      helperText="With text underneath"
      my={2}
    />
    <Bool
      {...props}
      variant="switch"
      helperText="With text underneath"
      my={1}
    />
    <Bool {...props} variant="switch" />
    <Bool {...props} />
    <Bool {...props} />
  </>
);

export const Radio = () => (
  <Bool {...props} variant="radio" />
);

export const WithExpandedDescription = () => (
  <Bool {...props} variant="switch" helperText="radio" />
);

export const WithError = () => (
  <Bool {...props} variant="radio" error />
);

export const withMargin = () => (
  <>
    <Bool {...props} variant="switch" my={1} />
    <Bool {...props} variant="switch" my={1} />
  </>
);
