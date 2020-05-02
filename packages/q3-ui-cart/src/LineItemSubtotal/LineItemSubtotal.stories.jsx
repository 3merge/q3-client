import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import LineItemSubtotal from './LineItemSubtotal';

export default {
  title: 'Cart|LineItem/Subtotal',
  decorators: [withA11y],
};

export const withNumber = () => (
  <LineItemSubtotal subtotal={23.33} />
);
