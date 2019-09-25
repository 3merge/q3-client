import React from 'react';
import { Components as ThemeComponents } from 'gatsby-theme-q3';
import { Components } from 'q3-ui';

const menuItems = [
  {
    href: '/about',
    label: 'About',
    visible: true,
  },
  {
    href: '/about',
    label: 'Repository',
    visible: true,
  },
];

export const wrapPageElement = ({ element }) => (
  <>
    <Components.Header
      menuItems={menuItems}
      logoImgSrc="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo4.png"
      renderRight={() => <ThemeComponents.LoginActions />}
    />
    {element}
    <Components.Divider
      fill="#303f9f"
      variant="mountains"
      invert
    />
    <Components.Footer
      socialLinks={['https://github.com/3merge']}
    />
  </>
);
