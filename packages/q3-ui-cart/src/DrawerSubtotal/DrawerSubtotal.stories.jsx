import React from 'react';
import {
  withKnobs,
  text,
  number,
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import DrawerSubtotal from './DrawerSubtotal';
import { CartContext } from '../context';

export default {
  title: 'Cart|Drawer/Subtotal',
  decorators: [withA11y, withKnobs],
  parameters: {
    component: DrawerSubtotal,
  },
};

export const withContextKnobs = () => {
  const currency = text('Currency', 'CAD');
  const subtotal = number('Subtotal', '12.99');
  return (
    <CartContext.Provider value={{ subtotal, currency }}>
      <DrawerSubtotal />
    </CartContext.Provider>
  );
};
