import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Fab from '@material-ui/core/Fab';
import Menu from '@material-ui/icons/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    padding: theme.spacing(3),
  },
  list: {
    width: 230,
  },
}));

const Offcanvas = ({ menu: Menu, left, children }) => {
  const { list, listContainer } = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = React.useCallback(() => {
    setState(!state);
  }, [state]);

  return (
    <Box>
      {children(toggleDrawer)}
      <SwipeableDrawer
        open={state}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
        className={listContainer}
        anchor={left ? 'left' : 'right'}
      >
        <Box className={list}>
          <Menu />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default Offcanvas;
