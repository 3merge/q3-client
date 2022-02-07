import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import {
  AppBar,
  Box,
  Paper,
  Hidden,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import useStyle from './styles';

const Navbar = ({ children, header, footer }) => {
  const cls = useStyle();

  const Interior = React.useMemo(
    () => (
      <>
        <div>
          {header}
          <Box p={1.5}>{children}</Box>
        </div>
        <Box mb={1.5}>{footer}</Box>
      </>
    ),
    [],
  );

  return (
    <>
      <Hidden mdDown>
        <Box className={cls.nav} component="nav">
          <Paper className={cls.paper} color="primary">
            {Interior}
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
          renderContent={() => Interior}
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
