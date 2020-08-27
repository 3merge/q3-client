import React from 'react';
import Box from '@material-ui/core/Box';
import IconButton from 'q3-ui/lib/iconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Link } from '@reach/router';
import { array, object } from 'q3-ui-helpers';
import { withLocation } from 'with-location';
import Drawer from 'q3-ui-dialog';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import NavigationLink from '../NavigationLink';
import NavigationSubMenu from '../NavigationSubMenu';
import useStyle from './useStyle';
import { QueryStringMatcher } from '../../helpers';

export const isPartialMatch = (a = '', b = '') => {
  try {
    // root directory
    if (a === '/') return a === b;

    // relative paths
    if (!b.startsWith('/') && a && b) return a.includes(b);

    const x = QueryStringMatcher.clean(a);
    const y = QueryStringMatcher.clean(b);
    return x === y || y.includes(x);
  } catch (e) {
    return false;
  }
};

const AppNavigation = withLocation(
  ({
    location,
    logoSrc,
    menuItems,
    subMenuItems,
    footerComponent,
    menuComponent,
    title = 'Menu',
    root = '/',
  }) => {
    const cls = useStyle();

    const filterByVisibility = (a = []) =>
      array.hasLength(a)
        ? a.filter(
            (item) =>
              array.hasLength(item.nestedMenuItems) ||
              (object.isIn(item, 'visible') &&
                item.visible),
          )
        : [];

    const recursivelyRenderMenuItems = (items) =>
      array.hasLength(items)
        ? items.map((item) => {
            const nodeId = item.to || item.label;
            const sub = filterByVisibility(
              item.nestedMenuItems,
            );

            const render = sub.length > 0 || item.to;

            return render ? (
              <TreeItem
                className="q3-admin-menu-item"
                label={<NavigationLink {...item} />}
                nodeId={nodeId}
                key={nodeId}
              >
                {recursivelyRenderMenuItems(sub)}
              </TreeItem>
            ) : null;
          })
        : null;

    const renderLogoAndDirectoryLink = React.useCallback(
      () => (
        <Link to={root} className={cls.logo}>
          <img alt="Q3 Client Logo" src={logoSrc} />
        </Link>
      ),
      [],
    );

    const renderMenuItems = () => {
      const getPartialMatch = (a = []) =>
        a
          .flatMap((item) => {
            const out = [];
            if (item.nestedMenuItems) {
              out.push(
                getPartialMatch(item.nestedMenuItems),
              );
            }

            return out
              .concat(
                isPartialMatch(item.to, location.pathname)
                  ? item.to
                  : [],
              )
              .flat();
          })
          .filter(Boolean);

      const getParentMatch = (a = []) =>
        a
          .map((item) => {
            if (!item.nestedMenuItems) return null;
            const matched = item.nestedMenuItems.find(
              (nest) => {
                if (nest.nestedMenuItems) {
                  return getParentMatch(
                    nest.nestedMenuItems,
                  );
                }

                return isPartialMatch(
                  nest.to,
                  location.pathname,
                );
              },
            );

            return matched ? item.label : null;
          })
          .filter(Boolean);

      const defaultSelected = getPartialMatch(menuItems);
      const defaultExpanded = getParentMatch(menuItems);

      return (
        <Box className={cls.nav}>
          <Box>
            {title && (
              <Hidden mdDown>
                <Box pb={1} px={1}>
                  <Typography
                    variant="body2"
                    component="h1"
                    align="center"
                  >
                    <strong>{title}</strong>
                  </Typography>
                </Box>
              </Hidden>
            )}
            {menuComponent || (
              <>
                <TreeView
                  component="div"
                  defaultExpandIcon={<ArrowRightIcon />}
                  defaultCollapseIcon={
                    <ArrowDropDownIcon />
                  }
                  selected={defaultSelected}
                  defaultExpanded={defaultExpanded}
                >
                  {recursivelyRenderMenuItems(
                    filterByVisibility(menuItems),
                  )}
                </TreeView>
                <NavigationSubMenu items={subMenuItems} />
              </>
            )}
          </Box>
          <Box>{footerComponent}</Box>
        </Box>
      );
    };

    return (
      <>
        <Hidden mdDown>
          <Box
            className={classnames(cls.root, cls.muted)}
            component="nav"
          >
            {renderLogoAndDirectoryLink()}
            {renderMenuItems()}
          </Box>
        </Hidden>
        <Hidden lgUp>
          <Grid
            alignItems="center"
            container
            className={classnames(cls.muted, cls.appbar)}
            component="nav"
          >
            <Drawer
              variant="drawer"
              anchor="left"
              title={title}
              closeOnRouteChange
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
              renderContent={renderMenuItems}
            />
            <Grid item style={{ height: '100%' }}>
              {renderLogoAndDirectoryLink()}
            </Grid>
          </Grid>
        </Hidden>
      </>
    );
  },
);

export default AppNavigation;
