import React from 'react';
import { actions } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import DrawerHeader from './DrawerHeader';
import { CartContext } from '../context';

export default {
  title: 'Cart|Drawer/Header',
  decorators: [withA11y, withKnobs],
  parameters: {
    component: DrawerHeader,
  },
};

export const withChildIconButton = () => {
  return (
    <CartContext.Provider
      value={{
        subtotal: 99.99,
        items: [1, 2, 3],
        ...actions({
          update: 'updated',
          clear: 'cleared',
        }),
      }}
    >
      <DrawerHeader>
        <IconButton>
          <KeyboardBackspace />
        </IconButton>
      </DrawerHeader>
    </CartContext.Provider>
  );
};
