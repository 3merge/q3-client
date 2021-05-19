import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import Drawer from 'q3-ui-dialog';
import AppBar from '@material-ui/core/AppBar';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NavigationListItem, {
  filterByVisibility,
} from '../NavigationListItem';
import useStyle from './useStyle';
import DirectoryLink from '../DirectoryLink';
import Logo from '../Logo';
import Title from '../Title';

const AppNavigation = ({
  children,
  logoSrc,
  menuItems,
}) => {
  const cls = useStyle();

  const renderMenuItems = () => (
    <Box className={cls.nav} component="ul">
      <NavigationListItem
        items={filterByVisibility(menuItems)}
      />
    </Box>
  );

  return (
    <AppBar
      color="primary"
      position="sticky"
      className={cls.bar}
      elevation={0}
    >
      <Box className={cls.root} component="nav">
        <Hidden lgUp>
          <DirectoryLink src={logoSrc}>
            <Drawer
              title="menu"
              closeOnRouteChange
              variant="drawer"
              renderContent={renderMenuItems}
              renderTrigger={(onClick) => (
                <Box
                  alignItems="center"
                  display="flex"
                  role="button"
                  onClick={onClick}
                  overflow="hidden"
                  pr={1}
                >
                  <IconButton
                    className={cls.avatar}
                    component="span"
                    color="inherit"
                  >
                    <Avatar src={logoSrc} />
                    <Box className={cls.avatarIcon}>
                      <MenuIcon />
                    </Box>
                  </IconButton>
                </Box>
              )}
            />
          </DirectoryLink>
        </Hidden>
        <Hidden mdDown>
          <Link to=".">
            <Logo src={logoSrc} />
          </Link>
        </Hidden>
        <Hidden mdDown>{renderMenuItems()}</Hidden>
      </Box>
      <Hidden lgUp>
        <Title />
      </Hidden>
      {children}
    </AppBar>
  );
};

AppNavigation.defaultProps = {
  children: null,
  menuItems: [],
  root: '/',
};

AppNavigation.propTypes = {
  children: PropTypes.element,
  logoSrc: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  root: PropTypes.string,
};

export default AppNavigation;
