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
      logoImgSrc="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo4.png"
      name="Placeholder"
      renderRight={() => <Cart />}
    />
    {element}
    <Divider fill="#303f9f" variant="mountains" invert />
    <Footer socialLinks={['https://github.com/3merge']} />
  </>
);
