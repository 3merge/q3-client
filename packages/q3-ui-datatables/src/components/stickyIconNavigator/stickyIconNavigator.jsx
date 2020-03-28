import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../utils/useStyles';

const StickyIconNavigator = ({ children }) => {
  const { sticky } = useStyles();

  return (
    <Grid item md="auto" sm={12} xs={12}>
      <Box className={sticky}>{children}</Box>
    </Grid>
  );
};

StickyIconNavigator.propTypes = {
  /**
   * The component for rendering beside/underneath the sidebar
   */
  children: PropTypes.node.isRequired,
};

export default StickyIconNavigator;
