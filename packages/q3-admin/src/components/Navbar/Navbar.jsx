import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import { Box, Paper, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import useStyle from './styles';
import Logo from '../Logo';
import ButtonWithIcon from '../ButtonWithIcon';

const Navbar = ({ children }) => {
  const cls = useStyle();

  return (
    <>
      <Hidden mdDown>
        <Box className={cls.nav} component="nav">
          <Paper
            // elevation={0}
            className={cls.paper}
            color="primary"
          >
            <Box>
              <Box
                alignItems="center"
                display="flex"
                justifyContent="space-between"
                width="100%"
              >
                <Box minWidth="calc(100% - 46px - 1.5rem)">
                  <Logo />
                </Box>
              </Box>
              <Box p={1.5}>{children}</Box>
            </Box>
          </Paper>
        </Box>
      </Hidden>
      <Hidden lgUp>
        <Dialog
          PaperProps={{
            style: {
              maxWidth: '320px',
            },
          }}
          anchor="left"
          closeOnRouteChange
          closeOnSearchChange
          renderContent={() => children}
          renderTrigger={(onClick) => (
            <Box
              component="nav"
              className={cls.appbar}
              id="app-navbar"
            >
              <Box id="menu-trigger" position="relative">
                <ButtonWithIcon
                  label="menu"
                  color="inherit"
                  onClick={onClick}
                  icon={MenuIcon}
                />
              </Box>
              <Logo />
            </Box>
          )}
          title="menu"
          variant="drawer"
        />
      </Hidden>
    </>
  );
};

Navbar.defaultProps = {
  children: null,
};

Navbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
};

export default Navbar;
