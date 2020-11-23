/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigation } from 'q3-hooked';
import { array } from 'q3-ui-helpers';

export const withoutUseNavigation = (List, ListItem) => ({
  menuItems,
}) => {
  const Menu = ({
    label,
    to,
    nestedMenuItems,
    icon,
    isExpanded,
    isSelected,
    onClick,
    ...rest
  }) => {
    const nests = array.hasLength(nestedMenuItems);
    return (
      <>
        {nests ? (
          <ListItem
            onClick={onClick}
            label={label}
            isExpanded={isExpanded}
            hasNestItems={nests}
            icon={icon}
          >
            <List>
              {nestedMenuItems.map((nest) => {
                return nest.nestedMenuItems ? (
                  <Menu {...nest} />
                ) : (
                  <ListItem {...nest} />
                );
              })}
            </List>
          </ListItem>
        ) : (
          <ListItem
            onClick={onClick}
            label={label}
            icon={icon}
            to={to}
            hasNestItems={nests}
            isSelected={isSelected}
            {...rest}
          />
        )}
      </>
    );
  };

  return (
    <List>
      {menuItems.map((menu) => {
        return <Menu {...menu} />;
      })}
    </List>
  );
};

const withNavigation = (List, ListItem) => {
  const Nav = withoutUseNavigation(List, ListItem);

  return ({ menuItems }) => {
    const { navigationMenus } = useNavigation(menuItems);
    return <Nav menuItems={navigationMenus} />;
  };
};

export default withNavigation;
