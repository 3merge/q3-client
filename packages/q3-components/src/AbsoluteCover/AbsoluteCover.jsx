import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

const AbsoluteCover = ({ children, ...rest }) => (
  <Box
    position="absolute"
    top="0"
    left="0"
    right="0"
    bottom="0"
    style={rest}
  >
    {children}
  </Box>
);

AbsoluteCover.defaultProps = {
  children: null,
};

AbsoluteCover.propTypes = {
  children: PropTypes.node,
};

export default AbsoluteCover;
