import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import DrawerBody from './DrawerBody';
import { CartContext } from '../context';

export default {
  title: 'Cart|Drawer/Body',
  decorators: [withA11y, withKnobs],
  parameters: {
    component: DrawerBody,
  },
};

export const asEmpty = () => {
  return (
    <CartContext.Provider
      value={{
        items: [],
      }}
    >
      <DrawerBody />
    </CartContext.Provider>
  );
};

export const withError = () => {
  return (
    <CartContext.Provider
      value={{
        hasError: true,
      }}
    >
      <DrawerBody />
    </CartContext.Provider>
  );
};
