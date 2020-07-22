import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const FigureWrapper = ({ children, fullWidth }) => (
  <Grid item xs={12} lg={fullWidth ? 12 : 6}>
    {children}
  </Grid>
);

FigureWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
};

FigureWrapper.defaultProps = {
  fullWidth: false,
};

export default FigureWrapper;
