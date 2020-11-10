/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import IconButton from 'q3-ui/lib/iconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Link } from '@reach/router';
import { useNavigation } from 'q3-hooked';
import Drawer from 'q3-ui-dialog';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import NavigationLink from '../NavigationLink';
import NavigationSubMenu from '../NavigationSubMenu';
import useStyle from './useStyle';

const Tree = (props) => (
  <TreeItem className="q3-admin-menu-item" {...props} />
);

const AppNavigation = ({
  logoSrc,
  menuItems,
  subMenuItems,
  footerComponent,
  menuComponent,
  title = 'Menu',
  root = '/',
}) => {
  const cls = useStyle();
  const {
    defaultExpanded,
    defaultSelected,
    renderMenuItems,
  } = useNavigation(menuItems);

  const renderLogoAndDirectoryLink = React.useCallback(
    () => (
      <Link to={root} className={cls.logo}>
        <img alt="Q3 Client Logo" src={logoSrc} />
      </Link>
    ),
    [],
  );

  const renderMenu = () => {
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
                defaultCollapseIcon={<ArrowDropDownIcon />}
                selected={defaultSelected[0]}
                defaultExpanded={defaultExpanded}
              >
                {renderMenuItems(Tree, NavigationLink)}
              </TreeView>
              <NavigationSubMenu items={subMenuItems} />
            </>
          )}
        </Box>
        {footerComponent && <Box>{footerComponent}</Box>}
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
          {renderMenu()}
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
            renderContent={renderMenu}
          />
          <Grid item style={{ height: '100%' }}>
            {renderLogoAndDirectoryLink()}
          </Grid>
        </Grid>
      </Hidden>
    </>
  );
};

AppNavigation.defaultProps = {
  title: 'Menu',
  root: '/',
};

AppNavigation.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      to: PropTypes.string,
      visible: PropTypes.bool,
      // eslint-disable-next-line react/forbid-prop-types
      nestedMenuItems: PropTypes.array,
      icon: PropTypes.node,
    }),
  ).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  subMenuItems: PropTypes.array,
  footerComponent: PropTypes.node,
  menuComponent: PropTypes.node,
  title: PropTypes.string,
  root: PropTypes.string,
};

export default AppNavigation;
