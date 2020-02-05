import React from 'react';
import LineItems from './lineItems';
import { CartContext } from '../context';

export default {
  title: 'Q3 Cart/LineItems',
  parameters: {
    component: LineItems,
    componentSubtitle: 'Cart product tile',
  },
};

export const PopulatedLineItems = () => (
  <CartContext.Provider
    value={{
      items: [
        {
          id: 1,
          img:
            'https://images.unsplash.com/photo-1580793210854-d22f57782c62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          name: 'My first product',
          label: 'Label',
          description:
            'This is a short description about this product',
          price: 12.99,
          subtotal: 24.99,
          quantity: 1,
        },
      ],
    }}
  >
    <LineItems>{() => <p>With child</p>}</LineItems>
  </CartContext.Provider>
);
