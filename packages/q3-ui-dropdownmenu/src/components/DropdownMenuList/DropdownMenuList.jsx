import React from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  MenuList,
  Drawer,
  useMediaQuery,
} from '@material-ui/core';

const DropdownMenuList = React.forwardRef(
  ({ children, ...rest }, ref) => {
    const Element = useMediaQuery((theme) =>
      theme.breakpoints.down('md'),
    )
      ? (props) => (
          <Drawer {...props}>
            <MenuList autoFocusItem variant="selectedMenu">
              {children}
            </MenuList>
          </Drawer>
        )
      : Menu;

    return (
      <Element ref={ref} {...rest}>
        {children}
      </Element>
    );
  },
);

DropdownMenuList.defaultProps = {
  children: null,
};

DropdownMenuList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default DropdownMenuList;
