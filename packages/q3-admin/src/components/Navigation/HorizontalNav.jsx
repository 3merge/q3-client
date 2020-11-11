import React from 'react';
import { Link } from '@reach/router';
import { useNavigation } from 'q3-hooked';
import NavigationLink from '../NavigationLink';

const Menu = ({ label, to, nestedMenuItems, icon }) => {
  const nests = nestedMenuItems?.length > 0;

  return (
    <>
      {nests ? (
        <li>
          <NavigationLink
            label={label}
            icon={icon}
            to={to}
          />
          {nests && (
            <ul>
              {nestedMenuItems.map((nest) => {
                const more = nest.nestedMenuItems;
                return more ? (
                  <Menu {...nest} />
                ) : (
                  <li>
                    <NavigationLink {...nest} />
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      ) : (
        <li>
          <NavigationLink
            label={label}
            icon={icon}
            to={to}
          />
        </li>
      )}
    </>
  );
};

const HorizontalNav = ({ menuItems }) => {
  const { navigationMenus } = useNavigation(menuItems);
  return (
    <div>
      <ul>
        {navigationMenus.map((menu, i) => {
          return <Menu {...menu} />;
        })}
      </ul>
    </div>
  );
};

export default HorizontalNav;
