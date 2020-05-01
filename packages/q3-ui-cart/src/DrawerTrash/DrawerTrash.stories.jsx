import React from 'react';
import { actions } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { CartContext } from '../context';
import DrawerTrash from './DrawerTrash';

export default {
  title: 'Cart|Drawer/Trash',
  decorators: [withA11y],
};

export const withOnClick = () => (
  <CartContext.Provider
    value={{
      ...actions({
        clear: 'cleared',
      }),
    }}
  >
    <DrawerTrash />
  </CartContext.Provider>
);
