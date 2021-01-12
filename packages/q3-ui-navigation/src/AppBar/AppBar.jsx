import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

const AppBar = ({ children, flexDirection }) => (
  <Box
    alignItems="center"
    bgcolor="background.default"
    component="header"
    display="flex"
    height="100%"
    flexDirection={flexDirection}
    justifyContent="space-between"
    width="100%"
  >
    {children}
  </Box>
);

AppBar.defaultProps = {
  children: null,
  flexDirection: undefined,
};

AppBar.propTypes = {
  children: PropTypes.node,
  flexDirection: PropTypes.string,
};

export default AppBar;
