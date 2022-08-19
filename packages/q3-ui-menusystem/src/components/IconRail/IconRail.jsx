import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Favicon from '../Favicon';
import { slim } from '../usePaperWidth/usePaperWidth';

const IconRail = ({ children }) => (
  <Box
    alignItems="center"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    height="100%"
    py={2}
    width={slim}
  >
    <Box>
      <Favicon />
      <Box mt={4}>{children}</Box>
    </Box>
    <Box>Footer</Box>
  </Box>
);

IconRail.defaultProps = {
  children: null,
};

IconRail.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
};

export default IconRail;
