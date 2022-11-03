import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import {
  Box,
  Paper,
  useMediaQuery,
} from '@material-ui/core';
import useStyle from './styles';
import useLocalStorageStateProxy from '../../hooks/useLocalStorageStateProxy';

const Navbar = ({ children }) => {
  const isMobile = useMediaQuery((theme) =>
    theme.breakpoints.down('md'),
  );

  // will sometimes come back as a string from storage
  const [stateValue, setState] = useLocalStorageStateProxy(
    'q3-appbar-menu',
    true,
  );

  const state = String(stateValue) === 'true';
  const cls = useStyle({
    state,
  });

  const toggle = () => setState(!state);

  const renderMenuTrigger = React.useCallback(
    (onClick) => (
      <span
        aria-hidden
        aria-label="hidden-menu"
        id="app-menu"
        onClick={isMobile ? onClick : toggle}
        style={{ display: 'none' }}
      />
    ),
    [isMobile, state],
  );

  return (
    <>
      <Box className={cls.nav} component="nav">
        <Paper
          className={cls.paper}
          color="primary"
          elevation={0}
        >
          {children}
        </Paper>
      </Box>
      <Dialog
        PaperProps={{
          className: cls.dialog,
        }}
        anchor="left"
        closeOnRouteChange
        closeOnSearchChange
        renderContent={() => children}
        renderTrigger={renderMenuTrigger}
        title="menu"
        variant="drawer"
      />
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
