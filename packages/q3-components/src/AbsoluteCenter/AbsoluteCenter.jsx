import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

const AbsoluteCenter = ({ children }) => (
  <Box
    position="absolute"
    top="50%"
    left="50%"
    style={{
      transform: 'translate(-50%,-50%)',
    }}
  >
    {children}
  </Box>
);

AbsoluteCenter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AbsoluteCenter;
