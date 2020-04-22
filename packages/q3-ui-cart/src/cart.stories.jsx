import React from 'react';
import { AuthContext } from 'q3-ui-permissions';
import {
  AddToCart,
  AddToCartIconButton,
  LineItems,
  Launcher,
  Drawer,
  QuantityField,
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
    items: [
      getProductDetails(),
      getProductDetails(),
      getProductDetails(),
    ],
  });

const withProvider = (Component, props) => (
  <AuthContext.Provider value={{ state: { init: true } }}>
    <Provider
      addItemToOrder={fakeRequestDelay}
      updateItemInOrder={fakeRequestDelay}
      removeItemInOrder={fakeRequestDelay}
      pollOrder={refreshOrder}
      {...props}
    >
      <Component />
    </Provider>
  </AuthContext.Provider>
);

export default {
  title: 'Q3 Cart|Cart',
};

export const Empty = withProvider(() => (
  <>
    <Launcher>
      {(close, isOpen) => (
        <Drawer isOpen={isOpen} close={close}>
          <LineItems />
        </Drawer>
      )}
    </Launcher>
    <AddToCart product={12} />
  </>
));

export const JustTheField = withProvider(() => (
  <QuantityField />
));

export const JustTheButton = withProvider(() => (
  <>
    <AddToCartIconButton product={10} />
    <AddToCartIconButton product={11} />
    <AddToCartIconButton product={12} />
  </>
));

export const DrawerIsOpen = () => <Drawer isOpen />;

export const DrawerWithChildren = () => (
  <Drawer isOpen>Fill with Items!</Drawer>
);

export const DrawerWithError = withProvider(
  () => (
    <Launcher>
      {(close, isOpen) => (
        <Drawer isOpen={isOpen} close={close}>
          <LineItems />
        </Drawer>
      )}
    </Launcher>
  ),
  {
    pollOrder: () => {
      return Promise.reject(new Error('Bad request!'));
    },
  },
);
