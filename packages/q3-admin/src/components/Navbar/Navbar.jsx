import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import {
  AppBar,
  Box,
  Paper,
  Hidden,
  IconButton,
  Divider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from '@reach/router';
import useStyle from './styles';
import NavbarList from '../NavbarList';

const Navbar = ({ children, header, footer }) => {
  const cls = useStyle();

  return (
    <>
      <Hidden mdDown>
        <Box className={cls.nav} component="nav">
          <Paper className={cls.paper} color="primary">
            <div>
              {header}
              PROFILE / NOTIFICATIONS
              <Divider />
              {children}
            </div>
            <div>
              <NavbarList
                items={{
                  undefined: [
                    {
                      label: 'help',
                      to: '/help',
                    },
                    {
                      label: 'system',
                      to: '/system',
                    },
                    {
                      label: 'Logoout',
                      to: '/logout',
                    },
                  ],
                }}
              />
            </div>

            {/* {footer && (
              <Box
                className={cls.footer}
                component="footer"
              >
                {footer}
              </Box>
            )} */}
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
            <AppBar
              color="primary"
              position="static"
              component="nav"
              className={cls.appbar}
            >
              <Box alignItems="center" display="flex">
                <IconButton
                  aria-label="open menu"
                  color="inherit"
                  onClick={onClick}
                >
                  <MenuIcon />
                </IconButton>
                {header}
              </Box>
              {footer}
            </AppBar>
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
  footer: null,
  header: null,
};

Navbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
  header: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
};

export default Navbar;
