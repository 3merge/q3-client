import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    padding: theme.spacing(3),
  },
  paper: ({ color }) => ({
    backgroundColor:
      color === 'primary'
        ? theme.palette.secondary.main
        : undefined,
  }),
}));

const Offcanvas = ({
  menu: Menu,
  left,
  children,
  color,
}) => {
  const [state, setState] = React.useState(false);
  const { list, listContainer, paper } = useStyles({
    color,
  });

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
        PaperProps={{
          className: paper,
        }}
      >
        <Box className={list} py={4}>
          <Menu done={toggleDrawer} />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default Offcanvas;
