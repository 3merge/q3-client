import React from 'react';
import { Components } from 'q3-ui';

const menuItems = [
  {
    to: '/about',
    label: 'About',
    visible: true,
  },
  {
    to: '/about',
    label: 'Repository',
    visible: true,
  },
];

export const wrapPageElement = ({ element }) => (
  <>
    <Components.Header
      menuItems={menuItems}
      logoImgSrc="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo4.png"
      name="Placeholder"
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
