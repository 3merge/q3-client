import React from 'react';
import { actions } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { CartContext } from '../context';
import DrawerTitle from './DrawerTitle';

export default {
  title: 'Cart|Drawer/Title',
  decorators: [withA11y, withKnobs],
};

export const withCustomCartName = () => {
  const name = text('Cart name', '');
  return (
    <CartContext.Provider
      value={{
        name,
        items: [1, 2],
        ...actions({
          updateOrder: 'updated!',
        }),
      }}
    >
      <DrawerTitle titleKey="name" />
    </CartContext.Provider>
  );
};
