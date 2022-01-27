import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper } from '@material-ui/core';
import useStyle from './styles';

const Navbar = ({ children, footer }) => {
  const cls = useStyle();

  return (
    <Box className={cls.nav} component="nav">
      <Paper className={cls.paper} color="primary">
        {children}
        {footer && (
          <Box className={cls.footer} component="footer">
            {footer}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

Navbar.defaultProps = {
  children: null,
  footer: null,
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
};

export default Navbar;
