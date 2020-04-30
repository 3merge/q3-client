import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { actions } from '@storybook/addon-actions';
import {
  withKnobs,
  select,
  number,
} from '@storybook/addon-knobs';
import Quantity from './Quantity';
import {
  REGULAR,
  LARGE,
  SMALL,
  STACKED,
  SPREAD,
} from './useStyle';

export default {
  title: 'Components|Quantity',
  decorators: [withA11y, withKnobs],
  parameters: {
    component: Quantity,
    componentSubtitle:
      'Controlled number input for incrementing whole numbers',
  },
};

export const WithVariableSizing = () => {
  const size = select(
    'Quantity size',
    [SMALL, REGULAR, LARGE],
    REGULAR,
  );

  const variant = select(
    'Quantity variant',
    [STACKED, SPREAD],
    STACKED,
  );

  return <Quantity size={size} variant={variant} />;
};

export const WithMinimum = () => {
  const minimum = number('Minimum value', 5);
  const defaultValue = number('Default value', 10);

  return (
    <Quantity
      minimum={minimum}
      defaultValue={defaultValue}
    />
  );
};
export const WithCustomThresholdCallback = () => (
  <Quantity
    {...actions({
      onMinimum: 'minimumReached',
    })}
  />
);
