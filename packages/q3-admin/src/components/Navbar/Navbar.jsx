import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import { Box, Paper, Hidden } from '@material-ui/core';
import useStyle from './styles';
import Logo from '../Logo';
import NavbarFooterLinks from '../NavbarFooterLinks';

const Navbar = ({ children }) => {
  const cls = useStyle();

  return (
    <>
      <Hidden mdDown>
        <Box className={cls.nav} component="nav">
          <Paper className={cls.paper} color="primary">
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
            >
              <Box
                bgcolor="background.paper"
                position="sticky"
                top="0"
                zIndex={1}
              >
                <Logo />
              </Box>
              <Box overflow="auto" flex="1" p={1.5}>
                {children}
              </Box>
              <Box
                bgcolor="background.paper"
                position="sticky"
                bottom="0"
                p={1.5}
              >
                <NavbarFooterLinks />
              </Box>
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
              <button
                aria-label="hidden-menu"
                id="app-menu"
                onClick={onClick}
                style={{
                  display: 'none',
                }}
              >
                menu
              </button>
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
