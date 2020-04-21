import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import useStyles from '../../utils/useStyles';

const StickyIconNavigator = ({ children }) => {
  const { sticky, navigator } = useStyles();

  return (
    <Box className={navigator}>
      <Box className={sticky}>{children}</Box>
    </Box>
  );
};

StickyIconNavigator.propTypes = {
  /**
   * The component for rendering beside/underneath the sidebar
   */
  children: PropTypes.node.isRequired,
};

export default StickyIconNavigator;
