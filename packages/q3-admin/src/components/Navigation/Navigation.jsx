import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Drawer from 'q3-ui-dialog';
import AppBar from '@material-ui/core/AppBar';
import {
  Avatar,
  IconButton,
  Grid,
} from '@material-ui/core';
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
        <DirectoryLink src={logoSrc}>
          <Hidden lgUp>
            <Drawer
              title="menu"
              closeOnRouteChange
              variant="drawer"
              renderContent={renderMenuItems}
              renderTrigger={(onClick) => (
                <Grid item>
                  <Box pl={1}>
                    <IconButton onClick={onClick}>
                      <Avatar src={logoSrc} />
                    </IconButton>
                  </Box>
                </Grid>
              )}
            />
          </Hidden>
          <Logo src={logoSrc} />
        </DirectoryLink>
        <Hidden mdDown>{renderMenuItems()}</Hidden>
      </Box>
      <Hidden smUp>
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
