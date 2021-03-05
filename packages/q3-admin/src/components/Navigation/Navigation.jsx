import React from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import Box from '@material-ui/core/Box';
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
      color="inherit"
      position="sticky"
      className={cls.bar}
      elevation={1}
    >
      <Hidden mdUp>
        <Drawer
          title="menu"
          closeOnRouteChange
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
          <Image
            alt="Logo"
            fluid={{
              src: logoSrc,
            }}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </Link>
        <Hidden smDown>{renderMenuItems()}</Hidden>
      </Box>
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
