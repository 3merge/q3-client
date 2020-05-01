import React from 'react';
import {
  withKnobs,
  number,
  boolean,
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import AddToCartButton from './AddToCartButton';
import { CartContext } from '../context';

export default {
  title: 'Cart|AddToCart/Button',
  decorators: [withA11y, withKnobs],
  parameters: {
    component: AddToCartButton,
  },
};

export const asLoading = () => {
  const fullWidth = boolean('Full width', true);
  const interval = number('Request timeout interval', 250);
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
      <AddToCartButton
        fullWidth={fullWidth}
        quantity={1}
        product="abc"
      />
    </CartContext.Provider>
  );
};
