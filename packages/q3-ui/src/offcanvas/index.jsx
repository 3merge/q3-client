import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { useToggle } from 'useful-state';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    padding: theme.spacing(3),
  },
  paper: ({ color }) => ({
    backgroundColor:
      color === 'primary'
        ? theme.palette.secondary.main
        : undefined,
    color: color === 'primary' ? '#FFF' : undefined,
    '& svg': {
      fill:
        color === 'primary' ? '#FFF !important' : undefined,
    },
    width: 375,
    [theme.breakpoints.down('sm')]: {
      width: 325,
    },

    [theme.breakpoints.down('xs')]: {
      width: '85%',
    },
  }),
}));

const Offcanvas = ({
  menu: Menu,
  left,
  children,
  color,
}) => {
  const { list, listContainer, paper } = useStyles({
    color,
  });

  const { toggle, state, close } = useToggle();

  return (
    <Box>
      {children(toggle)}
      <SwipeableDrawer
        open={state}
        onClose={toggle}
        onOpen={toggle}
        className={listContainer}
        anchor={left ? 'left' : 'right'}
        PaperProps={{
          className: paper,
        }}
      >
        <Box position="absolute" top="0" right="0">
          <IconButton onClick={close}>
            <Close />
          </IconButton>
        </Box>
        <Box className={list} py={3} px={1}>
          <Menu done={close} />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default Offcanvas;
