import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import { Box, Paper, Hidden } from '@material-ui/core';
import useStyle from './styles';
import Logo from '../Logo';
import NavbarCallToAction from '../NavbarCallToAction';

const Navbar = ({ callToAction, children }) => {
  const cls = useStyle();

  const NavigationContents = (
    <Box
      display="flex"
      className={cls.contents}
      flexDirection="column"
      height="100%"
      overflow="auto"
      flex="1"
    >
      <Hidden mdDown>
        <Box bgcolor="background.paper" top="0" zIndex={1}>
          <Logo />
        </Box>
      </Hidden>
      <Box display="flex" flexDirection="column" flex="1">
        <NavbarCallToAction {...callToAction} />
        <Box flex="1">{children}</Box>
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
  callToAction: null,
  children: null,
};

Navbar.propTypes = {
  callToAction: PropTypes.shape({
    icon: PropTypes.element,
    label: PropTypes.string,
    onClick: PropTypes.func,
  }),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
};

export default Navbar;
