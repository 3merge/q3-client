import React from 'react';
import { useNavigation } from 'q3-hooked';

const recursiveMenu = (List, ListItem) => (Component) => {
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
    const nests = nestedMenuItems?.length > 0;

    return (
      <>
        {nests ? (
          <ListItem
            onClick={onClick}
            label={label}
            isExpanded={isExpanded}
            hasNestItems={nests}
          >
            {nests && isExpanded && (
              <List>
                {nestedMenuItems.map((nest) => {
                  return nest.nestedMenuItems ? (
                    <Menu {...nest} />
                  ) : (
                    <ListItem {...nest} />
                  );
                })}
              </List>
            )}
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

export default recursiveMenu;
