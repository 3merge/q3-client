import React from 'react';
import { Link } from '@reach/router';
import {
  List,
  ListItem,
  Collapse,
} from '@material-ui/core';
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
        <>
          <ListItem onClick={onClick}>
            <div
              style={{
                background: isExpanded
                  ? 'orange'
                  : undefined,
              }}
            >
              {label}
            </div>
          </ListItem>
          {nests && (
            <Collapse in={isExpanded}>
              <List>
                {nestedMenuItems.map((nest) => {
                  return nest.nestedMenuItems ? (
                    <Menu {...nest} />
                  ) : (
                    <ListItem>
                      <NavigationLink {...nest} />
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          )}
        </>
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

const VerticalNav = ({ menuItems }) => {
  const { navigationMenus } = useNavigation(menuItems);
  return (
    <List>
      {navigationMenus.map((menu) => {
        return <Menu {...menu} />;
      })}
    </List>
  );
};

export default VerticalNav;

// export default recursiveMenu(
//   ({ children, ...rest }) => <ul {...rest}>{children}</ul>,
//   ({ children, ...rest }) => <li {...rest}>{children}</li>,
// )(VerticalNav);
