import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const Sidebar = ({ children, renderAside }) =>
  renderAside ? (
    <Grid container component="article">
      <Grid
        item
        component="aside"
        lg={2}
        md={3}
        sm={4}
        xs={12}
      >
        <Box py={2} px={2}>
          {renderAside()}
        </Box>
      </Grid>

      <Grid item style={{ flex: 1 }} component="section">
        <Box>{children}</Box>
      </Grid>
    </Grid>
  ) : (
    children
  );

Sidebar.propTypes = {
  /**
   * The component for rendering beside/underneath the sidebar
   */
  children: PropTypes.node.isRequired,

  /**
   * Renderer function for populating filter form.
   */
  renderAside: PropTypes.func,
};

Sidebar.defaultProps = {
  renderAside: null,
};

export default Sidebar;
