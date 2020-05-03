import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import AddToCartButton from './AddToCartButton';
import { CartContext } from '../context';

export default {
  title: 'Cart|AddToCart/Button',
  decorators: [withA11y],
  parameters: {
    component: AddToCartButton,
  },
};

export const withSuccess = () => (
  <CartContext.Provider
    value={{
      items: [],
      add: () =>
        new Promise((r) => {
          setTimeout(() => {
            r();
          }, 500);
        }),
    }}
  >
    <AddToCartButton quantity={1} product="abc" />
  </CartContext.Provider>
);

export const withFail = () => (
  <CartContext.Provider
    value={{
      items: [],
      add: () =>
        new Promise((r, reject) => {
          setTimeout(() => {
            reject();
          }, 500);
        }),
    }}
  >
    <AddToCartButton quantity={1} product="abc" />
  </CartContext.Provider>
);
