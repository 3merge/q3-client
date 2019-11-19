import React from 'react';
import Cart from 'q3-ui/lib/cart';
import Header from 'q3-ui/lib/header';
import Footer from 'q3-ui/lib/footer';
import Divider from 'q3-ui/lib/divider';

const menuItems = [
  {
    to: '/about',
    label: 'About',
    visible: true,
  },
  {
    to: '/',
    label: 'Repository',
    visible: true,
  },
];

export const wrapPageElement = ({ element }) => (
  <>
    <Header
      menuItems={menuItems}
      name="Q3"
      renderRight={() => <Cart />}
    />
    {element}
    <Divider fill="rgb(21, 14, 36)" variant="mountains" invert />
    <Footer socialLinks={['https://github.com/3merge']} />
  </>
);
