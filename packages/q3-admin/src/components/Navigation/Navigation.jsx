import React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import IconButton from 'q3-ui/lib/iconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { Link } from '@reach/router';
import { get } from 'lodash';
import { array } from 'q3-ui-helpers';
import { withLocation } from 'with-location';
import { useToggle } from 'useful-state';
import Drawer from 'q3-ui-dialog';
import MuiLink from '@material-ui/core/Link';
import AccountBox from '@material-ui/icons/AccountBox';
import useStyle from './useStyle';
import { QueryStringMatcher } from '../../helpers';
import ProfileActions from '../ProfileActions';

const getAllPaths = (c) =>
  React.Children.toArray(c).flatMap((i) => {
    const { children, to } = get(i, 'props', {});
    if (children) return getAllPaths(children);
    return to;
  });

export const isPartialMatch = (a = '', b = '') => {
  try {
    // root directory
    if (a === '/') return a === b;

    // relative paths
    if (!b.startsWith('/') && a && b) return a.includes(b);

    const x = QueryStringMatcher.clean(a);
    const y = QueryStringMatcher.clean(b);
    return x === y || y.startsWith(x);
  } catch (e) {
    return false;
  }
};

const AppNavigationMenuItem = withLocation(
  ({ icon: Icon, label, to, children, location }) => {
    const { pathname } = location;
    const includesAnActivePath =
      pathname &&
      getAllPaths(children).includes(
        pathname.split('?')[0],
      );

    const { toggle, state } = useToggle(
      includesAnActivePath,
    );

    return (
      <ListItem
        button
        to={to}
        selected={isPartialMatch(pathname, to)}
        component={to ? Link : undefined}
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
        disableRipple={Boolean(children)}
        style={{
          display: children ? 'block' : undefined,
          margin: 0,
          padding: 0,
        }}
        dense
      >
        <Box
          display="flex"
          justify="space-between"
          alignItems="center"
          px={1}
          py={0.5}
        >
          {Icon && (
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
          )}
          <ListItemText primary={label} />
          {children && (
            <Box>
              {state ? <ExpandLess /> : <ExpandMore />}
            </Box>
          )}
        </Box>
        <Collapse in={state}>
          <Box ml={1}>{children}</Box>
        </Collapse>
      </ListItem>
    );
  },
);

const AppNavigation = ({
  logoSrc,
  notificationComponent,
  menuItems,
  profileItems,
}) => {
  const cls = useStyle();

  const recursivelyRenderMenuItems = React.useCallback(
    (items) =>
      array.hasLength(items)
        ? items.map((item) => (
            <List
              component="div"
              key={item.label}
              style={{ padding: 0 }}
            >
              <AppNavigationMenuItem {...item}>
                {recursivelyRenderMenuItems(
                  item.nestedMenuItems,
                )}
              </AppNavigationMenuItem>
            </List>
          ))
        : null,
    [],
  );

  const renderLogoAndDirectoryLink = React.useCallback(
    () => (
      <Link to="/" className={cls.logo}>
        <img alt="Q3 Client Logo" src={logoSrc} />
      </Link>
    ),
    [],
  );

  const renderMenuItems = React.useCallback(
    () => (
      <Box className={cls.nav}>
        {recursivelyRenderMenuItems(menuItems)}
        <Box my={2}>
          <Divider />
          <Box py={1}>
            <Box mb={0.5}>
              <MuiLink
                fullWidth
                component={Link}
                style={{ fontSize: '0.911rem' }}
                to="/reports"
              >
                Reports
              </MuiLink>
            </Box>
            <Box mb={0.5}>
              <MuiLink
                fullWidth
                component={Link}
                style={{ fontSize: '0.911rem' }}
                to="/logs"
              >
                Logs
              </MuiLink>
            </Box>
          </Box>
        </Box>
      </Box>
    ),
    [],
  );

  return (
    <>
      <Hidden mdDown>
        <Box className={cls.root} px={0.5} component="nav">
          {renderLogoAndDirectoryLink()}
          {renderMenuItems()}
        </Box>
      </Hidden>
      <Hidden lgUp>
        <Box
          component="nav"
          display="flex"
          justifyContent="space-between"
          px={0.5}
          width="100%"
        >
          <Box display="flex">
            <Drawer
              variant="drawer"
              anchor="left"
              title="menu"
              renderTrigger={(onClick) => (
                <IconButton
                  icon={MenuIcon}
                  label="menu"
                  buttonProps={{ onClick }}
                />
              )}
              renderContent={renderMenuItems}
            />
            {renderLogoAndDirectoryLink()}
          </Box>
        </Box>
      </Hidden>
    </>
  );
};

export default AppNavigation;
