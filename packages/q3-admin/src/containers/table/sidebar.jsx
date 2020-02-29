import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import Filter from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/core/styles';
import { useToggle } from 'useful-state';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto',
    marginRight: '-5rem',
    marginTop: 2,
    transition: 'margin 500ms',
    '&:hover': {
      marginRight: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '1rem 0',
      width: '100%',
    },
  },
  fill: {
    flex: 1,
    zIndex: 1,
  },
}));

const Sidebar = ({ children, renderAside }) => {
  const { root, fill } = useStyles();
  const { toggle, state, close } = useToggle(false);
  const anchorEl = React.useRef();

  return renderAside ? (
    <Grid container component="article">
      <Grid item component="aside" className={root}>
        <Fab
          variant="extended"
          onClick={toggle}
          ref={anchorEl}
          size="large"
          color="secondary"
          style={{
            position: 'sticky',
            top: 0,
          }}
        >
          <Filter />
          <Box ml={2}>Filter</Box>
        </Fab>
        <Popover
          elevation={20}
          id="mouse-over-popover"
          open={state}
          anchorEl={anchorEl.current}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={close}
          disableRestoreFocus
          style={{
            width: 450,
            padding: '1rem',
          }}
          PaperProps={{
            elevation: 20,
            style: {
              padding: '1rem',
            },
          }}
        >
          <div>{renderAside()}</div>
        </Popover>
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
