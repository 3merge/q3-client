import React from 'react';
import { Link } from '@reach/router';
import { useNavigation } from 'q3-hooked';
import NavigationLink from '../NavigationLink';

const MyList = ({ label, children, ...rest }) => (
  <li {...rest}>
    {label}
    {children}
  </li>
);

const HorizontalNav = ({ menuItems }) => {
  const { renderMenuItems } = useNavigation(menuItems);
  return (
    <div>
      <ul>{renderMenuItems(MyList, NavigationLink)}</ul>
    </div>
  );
};

export default HorizontalNav;
