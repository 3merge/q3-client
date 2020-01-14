import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  AddToCart,
  LineItems,
  Launcher,
  Drawer,
} from './components';
import Provider from './context';

storiesOf('Cart|Drawer', module)
  .add('Empty', () => <Drawer isOpen />)
  .add('With children', () => (
    <Drawer isOpen>Fill with Items!</Drawer>
  ));

const fakeRequestDelay = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve(), 1000),
  );

const refreshOrder = () =>
  Promise.resolve({
    subtotal: 99.99,
    total: 99.99,
    items: [
      {
        sku: 'REQUREST',
        quantity: 2,
        price: 11.22,
        id: 1,
      },
    ],
  });

storiesOf('Cart|Icon', module).add('Empty', () => (
  <Provider
    addItemToOrder={fakeRequestDelay}
    updateItemInOrder={fakeRequestDelay}
    removeItemInOrder={fakeRequestDelay}
    pollOrder={refreshOrder}
  >
    <Launcher>
      {(close, isOpen) => (
        <Drawer isOpen={isOpen} close={close}>
          <LineItems />
        </Drawer>
      )}
    </Launcher>

    <AddToCart
      product={12}
      service={() =>
        Promise.resolve({
          subtotal: 9.99,
          total: 87.99,
          items: [
            {
              product: 1,
              label: 'Item',
              quantity: 2,
              price: 12.99,
            },
          ],
        })
      }
    />
  </Provider>
));
