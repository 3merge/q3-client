import React from 'react';
import { Link } from '@reach/router';
import { useNavigation } from 'q3-hooked';
import NavigationLink from '../NavigationLink';

const Menu = ({
  label,
  to,
  nestedMenuItems,
  icon,
  isExpanded,
  onClick,
}) => {
  const nests = nestedMenuItems?.length > 0;

  return (
    <>
      {nests ? (
        <li>
          <span
            onClick={onClick}
            style={{
              background: isExpanded ? 'orange' : undefined,
            }}
          >
            {label}
          </span>

          {nests && isExpanded && (
            <ul>
              {nestedMenuItems.map((nest) => {
                return nest.nestedMenuItems ? (
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

const List = ({ children }) => <ul>{children}</ul>;

const ListItem = ({ label, children, withControls }) => (
  <li>
    {withControls(label)}
    {children}
  </li>
);

const VerticalNav = ({ menuItems }) => {
  const { recurse } = useNavigation(menuItems);
  return <div>{recurse(List, ListItem)}</div>;
};

/**

  return (
    <div>
      <ul>
        {navigationMenus.map((menu, i) => {
          return <Menu {...menu} />;
        })}
      </ul>
    </div>
  );
 */

export default VerticalNav;
