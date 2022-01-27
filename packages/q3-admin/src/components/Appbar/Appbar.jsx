import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar as MuiAppbar,
  Box,
  Hidden,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { isFunction } from 'lodash';
import useStyle from './styles';

const Appbar = ({ onClick, logo, children }) => {
  const cls = useStyle();

  return (
    <MuiAppbar color="inherit" position="static">
      <Toolbar className={cls.toolbar}>
        <Box className={cls.menu}>
          {isFunction(onClick) && (
            <Hidden mdUp>
              <IconButton onClick={onClick}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          )}
          {logo}
        </Box>
        <Box className={cls.utilities}>{children}</Box>
      </Toolbar>
    </MuiAppbar>
  );
};

Appbar.defaultProps = {
  children: null,
  onClick: undefined,
  logo: null,
};

Appbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
  onClick: PropTypes.func,
  logo: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
};

export default Appbar;
