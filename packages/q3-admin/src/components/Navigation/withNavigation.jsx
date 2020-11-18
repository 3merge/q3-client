/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigation } from 'q3-hooked';
import { array } from 'q3-ui-helpers';

const withNavigation = (List, ListItem) => (Component) => {
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

  return ({ menuItems, ...props }) => {
    const { navigationMenus } = useNavigation(menuItems);

    const renderMenu = () => {
      return (
        <List>
          {navigationMenus.map((menu) => {
            return <Menu {...menu} />;
          })}
        </List>
      );
    };

    return (
      <Component
        {...props}
        renderMenu={renderMenu}
        menuItems={menuItems}
      />
    );
  };
};

export default withNavigation;
