import React from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  MenuList,
  Drawer,
  useMediaQuery,
} from '@material-ui/core';

const DropdownMenuList = ({ children, ...rest }) => {
  const Element = useMediaQuery((theme) =>
    theme.breakpoints.down('md'),
  )
    ? (props) => (
        <Drawer {...props}>
          <MenuList>{children}</MenuList>
        </Drawer>
      )
    : Menu;

  return <Element {...rest}>{children}</Element>;
};

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
