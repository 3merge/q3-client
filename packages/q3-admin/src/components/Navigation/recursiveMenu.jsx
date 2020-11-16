import React from 'react';
import { useNavigation } from 'q3-hooked';
import NavigationLink from '../NavigationLink';

const recursiveMenu = (List, ListItem) => (Component) => {
  const RecursiveList = ({
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
          <ListItem>
            <span
              onClick={onClick}
              style={{
                background: isExpanded
                  ? 'orange'
                  : undefined,
              }}
            >
              {label}
            </span>

            {nests && isExpanded && (
              <List>
                {nestedMenuItems.map((nest) => {
                  return nest.nestedMenuItems ? (
                    <CustomList {...nest} />
                  ) : (
                    <ListItem>
                      <NavigationLink {...nest} />
                    </ListItem>
                  );
                })}
              </List>
            )}
          </ListItem>
        ) : (
          <ListItem>
            <NavigationLink
              label={label}
              icon={icon}
              to={to}
            />
          </ListItem>
        )}
      </>
    );
  };

  return ({ menuItems, children }) => {
    return (
      <Component>
        <List>
          <RecursiveList {...menuItems} />
        </List>
        {children}
      </Component>
    );
  };
};

export default recursiveMenu;
