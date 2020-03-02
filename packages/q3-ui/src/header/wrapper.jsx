import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

const Wrapper = ({ children }) => (
  <Grid item>
    <Toolbar
      dense
      variant="dense"
      style={{ height: '100%' }}
    >
      {children}
    </Toolbar>
  </Grid>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
