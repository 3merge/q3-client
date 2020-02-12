import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: 275,
  },
  fill: {
    flex: 1,
  },
}));

const Sidebar = ({ children, renderAside }) => {
  const { root, fill } = useStyles();

  return renderAside ? (
    <Grid container component="article">
      <Grid item component="aside" className={root}>
        <Box py={1}>{renderAside()}</Box>
      </Grid>

      <Grid item className={fill} component="section">
        <Box>{children}</Box>
      </Grid>
    </Grid>
  ) : (
    children
  );
};

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
