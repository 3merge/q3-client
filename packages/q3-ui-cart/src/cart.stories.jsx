import React from 'react';
import {
  AddToCart,
  LineItems,
  Launcher,
  Drawer,
} from './components';
import Provider from './context';

const fakeRequestDelay = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve(), 1000),
  );

const getProductDetails = () => ({
  product: 1,
  label: 'Item',
  quantity: 2,
  price: 12.11,
  name: 'SKU NAME',
  description:
    'This is a small blurb about the product. It will be truncated if it goes on longer than it should.',
  subtotal: 24.22,
  img:
    'https://images.unsplash.com/photo-1580793210854-d22f57782c62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
});

const refreshOrder = () =>
  Promise.resolve({
    subtotal: 99.99,
    total: 99.99,
    items: [
      getProductDetails(),
      getProductDetails(),
      getProductDetails(),
    ],
  });

export default {
  title: 'Q3 Cart/Cart',
};

export const Empty = () => (
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
          items: [getProductDetails()],
        })
      }
    />
  </Provider>
);

export const DrawerIsOpen = () => <Drawer isOpen />;
export const DrawerWithChildren = () => (
  <Drawer isOpen>Fill with Items!</Drawer>
);
