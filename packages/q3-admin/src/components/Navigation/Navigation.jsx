import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import IconButton from 'q3-ui/lib/iconButton';
import AppsIcon from '@material-ui/icons/Apps';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import { Link, useLocation } from '@reach/router';
import Drawer from 'q3-ui-dialog';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import NavigationListItem, {
  filterByVisibility,
} from '../NavigationListItem';
import useStyle from './useStyle';

const getAppProps = (v) => {
  const out = {};
  if (v.includes('docs')) out.isDocs = true;
  return out;
};

const AppNavigation = ({
  children,
  logoSrc,
  menuItems,
  root,
}) => {
  const appProps = getAppProps(useLocation().pathname);
  const cls = useStyle(appProps);

  const getLogo = () => {
    if (appProps.isDocs)
      return 'https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png';
    return logoSrc;
  };

  const renderTitle = () => {
    const title = '3merge';
    if (appProps.isDocs) return 'Docs';
    return title;
  };

  const renderMenuItems = () => (
    <Box className={cls.nav} component="ul">
      <NavigationListItem
        items={filterByVisibility(menuItems)}
      />
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      className={cls.bar}
      elevation={2}
    >
      <Hidden lgUp>
        <Drawer
          title="menu"
          closeOnRouteChange
          variant="drawer"
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
        <Box className={cls.logo}>
          <Drawer
            title="Gentek"
            closeOnRouteChange
            variant="drawer"
            anchor="left"
            style={{ width: 325 }}
            renderContent={() => (
              <List>
                <ListItem button component={Link} to="/">
                  <ListItemAvatar>
                    <Avatar src={logoSrc} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="OET"
                    secondary="Business automation"
                  />
                </ListItem>
                <ListItem button component={Link} to="docs">
                  <ListItemAvatar>
                    <Avatar src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Documentation"
                    secondary="Control the docs"
                  />
                </ListItem>
                <Drawer
                  title="Gentek"
                  closeOnRouteChange
                  variant="drawer"
                  anchor="left"
                  style={{ width: 325 }}
                  renderContent={() =>
                    'OUR LATEST RELEASE NOTES...'
                  }
                  renderTrigger={(onClick) => (
                    <ListItem button onClick={onClick}>
                      <ListItemAvatar>
                        <Avatar src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png" />
                      </ListItemAvatar>
                      <ListItemText
                        primary="What's New?"
                        secondary="See what we've been up to"
                      />
                    </ListItem>
                  )}
                />
              </List>
            )}
            renderTrigger={(onClick) => (
              <IconButton
                icon={AppsIcon}
                label="apps"
                buttonProps={{
                  id: 'q3-admin-mobile-menu',
                  style: { marginLeft: '1rem' },
                  onClick,
                }}
              />
            )}
          />

          <Link to={root}>
            <Avatar
              className={cls.logoAvatar}
              src={getLogo()}
            />
            {renderTitle()}
          </Link>
        </Box>
        {!appProps.isDocs && (
          <Hidden mdDown>{renderMenuItems()}</Hidden>
        )}
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
