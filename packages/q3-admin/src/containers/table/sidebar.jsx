import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    width: 235,
    backgroundColor: '#FFF',
    borderRight: '2px solid whitesmoke',
    borderRadius: '2px',
    [theme.breakpoints.down('md')]: {
      borderRight: 0,
      borderBottom: '2px solid whitesmoke',
      width: '100%',
    },
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
        <Box p={1}>{renderAside()}</Box>
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
