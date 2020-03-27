import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import Filter from '@material-ui/icons/FilterList';
import Tooltip from 'q3-ui/lib/tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { useToggle } from 'useful-state';

const useStyles = makeStyles((theme) => ({
  root: {
    transition: 'margin 500ms',

    [theme.breakpoints.down('sm')]: {
      margin: '1rem 0',
      width: '100%',
    },
  },
  trigger: {
    borderRadius: 3,
    position: 'sticky',
    top: '1rem',
    background: '#FFF',
    color: theme.palette.primary.dark,

    '&:hover': {
      color: '#FFF !important',
    },

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  fill: {
    flex: 1,
    zIndex: 1,
  },
}));

const Sidebar = ({ children, renderAside }) => {
  const { root, fill, trigger } = useStyles();
  const { toggle, state, close } = useToggle(false);
  const anchorEl = React.useRef();

  return renderAside ? (
    <Grid container component="article">
      <Grid item component="aside" className={root}>
        <Tooltip
          arrow
          title="Filter results"
          placement="bottom-start"
        >
          <Fab
            onClick={toggle}
            ref={anchorEl}
            size="large"
            color="secondary"
            className={trigger}
          >
            <Filter />
          </Fab>
        </Tooltip>
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
          PaperProps={{
            elevation: 20,
            style: {
              padding: '1rem',
            },
          }}
        >
          <Box width="450px" maxWidth="100%">
            {renderAside()}
          </Box>
        </Popover>
      </Grid>

      <Grid item className={fill} component="section">
        <Paper>{children}</Paper>
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
