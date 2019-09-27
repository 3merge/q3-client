import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
  sticky: {
    position: 'sticky',
    top: 0,
  },
  colourful: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[1],
    boxSizing: 'border-box',
    color: '#FFF',
    height: '100vh',
    overflow: 'auto',
    paddingTop: theme.spacing(2),
    width: 250,
    '& *': {
      color: '#FFF',
    },
  },
  mobile: {
    backgroundColor: theme.palette.primary.main,
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    width: 185,
  },
}));

const MobileDrawer = ({ open, toggle, children }) => {
  const { mobile } = useStyles();
  return (
    <SwipeableDrawer
      variant="temporary"
      open={open}
      onClose={toggle}
      onOpen={toggle}
    >
      <Box component="aside" className={mobile}>
        {children}
      </Box>
    </SwipeableDrawer>
  );
};

MobileDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  toggle: PropTypes.func.isRequired,
};

const Sidebar = ({ renderTrigger, children }) => {
  const [open, setOpen] = useState(false);
  const { colourful } = useStyles();

  const toggleDrawer = React.useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <>
      <MobileDrawer open={open} toggle={toggleDrawer}>
        {children}
      </MobileDrawer>
      <Hidden smDown implementation="css">
        <Box className={colourful} component="aside">
          {children}
        </Box>
      </Hidden>
      <Hidden mdUp implementation="css">
        {renderTrigger(toggleDrawer, open)}
      </Hidden>
    </>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  renderTrigger: PropTypes.func.isRequired,
};

export default Sidebar;
