import React from 'react';
import { actions } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import Drawer from './Drawer';
import { CartContext } from '../context';

export default {
  title: 'Cart|Drawer/Complete',
  decorators: [withA11y, withKnobs],
  parameters: {
    component: Drawer,
  },
};

export const withOpenProp = () => (
  <CartContext.Provider
    value={{
      items: [],
    }}
  >
    <Drawer
      {...actions({ close: 'closed' })}
      isOpen={boolean('Toggle drawer', true)}
    >
      <div />
    </Drawer>
  </CartContext.Provider>
);
