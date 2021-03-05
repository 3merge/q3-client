import React from 'react';
import Box from '@material-ui/core/Box';
import { useMatch } from '@reach/router';
import IconButton from 'q3-ui/lib/iconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import { Link } from '@reach/router';
import { array, object } from 'q3-ui-helpers';
import Drawer from 'q3-ui-dialog';
import { isObject, some } from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigationLink from '../NavigationLink';
import useStyle from './useStyle';

const AppNavigation = ({
  children,
  logoSrc,
  menuItems,
  menuComponent,
  root = '/',
}) => {
  const cls = useStyle();

  const filterByVisibility = (a = []) =>
    array.hasLength(a)
      ? a.filter(
          (item) =>
            array.hasLength(item.nestedMenuItems) ||
            (object.isIn(item, 'visible') && item.visible),
        )
      : [];

  const recursivelyRenderMenuItems = (items) =>
    array.hasLength(items)
      ? items.map((item) => {
          const nodeId = item.to || item.label;
          const sub = filterByVisibility(
            item.nestedMenuItems,
          );

          const sublen = sub.length > 0;
          const render = sublen || item.to;

          return render ? (
            <Box component="li" key={nodeId}>
              <NavigationLink
                includesPartiallyCurrent={some(sub, (v) => {
                  return isObject(useMatch(`${v.to}/*`));
                })}
                {...item}
              >
                {sublen && <ExpandMoreIcon />}
              </NavigationLink>
              {sublen && (
                <Box position="absolute" component="ul">
                  {recursivelyRenderMenuItems(sub)}
                </Box>
              )}
            </Box>
          ) : null;
        })
      : null;

  const renderMenuItems = () => {
    return (
      <Box className={cls.nav} component="ul">
        {menuComponent ||
          recursivelyRenderMenuItems(
            filterByVisibility(menuItems),
          )}
      </Box>
    );
  };

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
          <img alt="Logo" src={logoSrc} />
        </Link>
        <Hidden smDown>{renderMenuItems()}</Hidden>
      </Box>
      {children}
    </AppBar>
  );
};

export default AppNavigation;
