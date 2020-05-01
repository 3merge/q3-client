import React from 'react';
import {
  withKnobs,
  number,
  select,
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import AddToCart from './AddToCart';
import { CartContext } from '../context';

export default {
  title: 'Cart|AddToCart/Complete',
  decorators: [withA11y, withKnobs],
  parameters: {
    component: AddToCart,
  },
};

export const asLoading = () => {
  const interval = number('Request timeout interval', 250);
  const size = select(
    'Size of the input',
    ['small', 'regular', 'large'],
    'regular',
  );

  return (
    <CartContext.Provider
      value={{
        items: [],
        add: () =>
          new Promise((r) => {
            setTimeout(() => {
              r();
            }, interval);
          }),
      }}
    >
      <AddToCart product="abc" size={size} />
    </CartContext.Provider>
  );
};
