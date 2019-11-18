import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    padding: theme.spacing(3),
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
          <Menu close={toggleDrawer} />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default Offcanvas;
