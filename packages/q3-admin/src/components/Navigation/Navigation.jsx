import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box } from '@material-ui/core';
import IconButton from 'q3-ui/lib/iconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import { Link } from '@reach/router';
import Drawer from 'q3-ui-dialog';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import NavigationListItem, {
  filterByVisibility,
} from '../NavigationListItem';
import useStyle from './useStyle';

const AppNavigation = ({
  children,
  logoSrc,
  menuItems,
  root,
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
      <Box
        alignItems="center"
        display="flex"
        height="100%"
        width="auto"
      >
        <Hidden lgUp>
          <Drawer
            PaperProps={{
              style: {
                maxWidth: '80vw',
              },
            }}
            title="menu"
            closeOnRouteChange
            variant="drawer"
            anchor="left"
            renderContent={renderMenuItems}
            renderTrigger={(onClick) => (
              <Grid item>
                <Box pl={1}>
                  <IconButton
                    icon={MenuIcon}
                    label="menu"
                    buttonProps={{
                      id: 'q3-admin-mobile-menu',
                      onClick,
                    }}
                  />
                </Box>
              </Grid>
            )}
          />
        </Hidden>
        <Box className={cls.root} component="nav">
          <Link to={root} className={cls.logo}>
            <Avatar className={cls.avatar} src={logoSrc} />
          </Link>
          <Hidden mdDown>{renderMenuItems()}</Hidden>
        </Box>
      </Box>
      {children}
    </AppBar>
  );
};

AppNavigation.defaultProps = {
  children: null,
  // our github favicon
  logoSrc:
    'https://github.com/3merge/3merge-2019/blob/master/src/images/fav.png?raw=true',
  menuItems: [],
  root: '/',
};

AppNavigation.propTypes = {
  children: PropTypes.element,
  logoSrc: PropTypes.string,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  root: PropTypes.string,
};

export default AppNavigation;
