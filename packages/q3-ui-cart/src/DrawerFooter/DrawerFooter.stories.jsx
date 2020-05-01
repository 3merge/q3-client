import React from 'react';
import { actions } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import DrawerFooter from './DrawerFooter';
import { CartContext } from '../context';

export default {
  title: 'Cart|Drawer/Footer',
  decorators: [withA11y, withKnobs],
  parameters: {
    component: DrawerFooter,
  },
};

export const withoutItems = () => (
  <CartContext.Provider value={{ items: [] }}>
    <DrawerFooter />
  </CartContext.Provider>
);

export const withItems = () => (
  <CartContext.Provider value={{ items: [1, 2, 3] }}>
    <DrawerFooter {...actions({ close: 'close' })} />
  </CartContext.Provider>
);
