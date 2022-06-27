import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import { Box, Paper, Hidden } from '@material-ui/core';
import useStyle from './styles';
import Logo from '../Logo';
import NavbarFooterLinks from '../NavbarFooterLinks';

const Navbar = ({ children }) => {
  const cls = useStyle();

  const NavigationContents = (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
    >
      <Hidden mdDown>
        <Box
          bgcolor="background.paper"
          position="sticky"
          top="0"
          zIndex={1}
        >
          <Logo />
        </Box>
      </Hidden>
      <Box overflow="auto" flex="1">
        {children}
      </Box>
      <Box
        bgcolor="background.paper"
        position="sticky"
        bottom="0"
      >
        <NavbarFooterLinks />
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden mdDown>
        <Box className={cls.nav} component="nav">
          <Paper className={cls.paper} color="primary">
            {NavigationContents}
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
          renderContent={() => NavigationContents}
          renderTrigger={(onClick) => (
            <Box
              component="nav"
              className={cls.appbar}
              id="app-navbar"
            >
              {/* eslint-disable-next-line */}
              <span
                aria-label="hidden-menu"
                id="app-menu"
                onClick={onClick}
                role="button"
                style={{
                  display: 'none',
                }}
              />
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
