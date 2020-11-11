import React from 'react';
import { Link } from '@reach/router';
import { useNavigation } from 'q3-hooked';
import NavigationLink from '../NavigationLink';

const Menu = ({ label, to, nestedMenuItems, icon }) => {
  const nests = nestedMenuItems?.length > 0;

  return nests ? (
    <ul>
      <li>
        <NavigationLink label={label} icon={icon} to={to} />
        {nests &&
          nestedMenuItems.map((nest) => <Menu {...nest} />)}
      </li>
    </ul>
  ) : (
    <ul>
      <li>
        <NavigationLink label={label} icon={icon} to={to} />
      </li>
    </ul>
  );
};

const HorizontalNav = ({ menuItems }) => {
  const { navigationMenus } = useNavigation(menuItems);
  return (
    <div>
      {navigationMenus.map((menu, i) => {
        return <Menu {...menu} />;
      })}
    </div>
  );
};

export default HorizontalNav;
