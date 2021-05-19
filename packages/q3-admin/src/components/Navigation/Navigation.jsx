import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import AppsIcon from '@material-ui/icons/Apps';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import { Link, useLocation } from '@reach/router';
import Drawer from 'q3-ui-dialog';
import AppBar from '@material-ui/core/AppBar';
import DocsIcon from 'q3-ui-assets/lib/SvgIcons/DocsIcon';
import WhatsNew from 'q3-ui-assets/lib/SvgIcons/WhatsNew';
import NavigationListItem, {
  filterByVisibility,
} from '../NavigationListItem';
import useStyle from './useStyle';
import DirectoryLink from '../DirectoryLink';
import Title from '../Title';
import MobileMenu from '../MobileMenu';

const getAppProps = (v) => {
  const out = {};
  if (v.includes('docs')) out.isDocs = true;
  return out;
};

const AppNavigation = ({
  children,
  logoSrc,
  menuItems,
}) => {
  const appProps = getAppProps(useLocation().pathname);
  const cls = useStyle(appProps);

  const renderLogo = () => {
    if (appProps.isDocs)
      return (
        <Avatar
          className={cls.logoSrc}
          style={{
            backgroundColor: 'transparent',
            overflow: 'visible',
          }}
        >
          <DocsIcon />
        </Avatar>
      );

    return <Avatar src={logoSrc} />;
  };

  const filteredMenuItems = filterByVisibility(menuItems);

  const renderMenuItems = () => (
    <Box className={cls.nav} component="ul">
      <NavigationListItem items={filteredMenuItems} />
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      className={cls.bar}
      elevation={2}
    >
      <Box className={cls.root} component="nav">
        <Hidden mdDown>
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
                    <Avatar
                      style={{
                        backgroundColor: 'transparent',
                        overflow: 'visible',
                      }}
                    >
                      <DocsIcon />
                    </Avatar>
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
                        <Avatar
                          style={{
                            backgroundColor: 'transparent',
                            overflow: 'visible',
                          }}
                        >
                          <WhatsNew />
                        </Avatar>
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
              <Box
                display="flex"
                alignItems="center"
                className={cls.avatar}
                px={2}
              >
                <IconButton
                  onClick={onClick}
                  color="inherit"
                >
                  <AppsIcon />
                </IconButton>
                <Link
                  to="."
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    marginLeft: '1rem',
                    color: 'inherit',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                  }}
                >
                  {renderLogo()}
                </Link>
              </Box>
            )}
          />
        </Hidden>
        <Hidden lgUp>
          <DirectoryLink src={logoSrc}>
            <Drawer
              title="menu"
              closeOnRouteChange
              variant="drawer"
              anchor="left"
              style={{ width: 325 }}
              renderContent={() => (
                <MobileMenu menuItems={filteredMenuItems} />
              )}
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
                    {renderLogo()}
                    <Box className={cls.avatarIcon}>
                      <MenuIcon />
                    </Box>
                  </IconButton>
                </Box>
              )}
            />
          </DirectoryLink>
        </Hidden>
        {!appProps.isDocs && (
          <Hidden mdDown>{renderMenuItems()}</Hidden>
        )}
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
};

export default AppNavigation;
