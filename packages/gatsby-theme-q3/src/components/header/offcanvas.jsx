import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
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

export default function SwipeableTemporaryDrawer() {
  const { list, listContainer } = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = React.useCallback(() => {
    setState(!state);
  }, [state]);

  return (
    <Hidden mdUp>
      <Box>
        <Fab onClick={toggleDrawer} size="small" color="secondary">
          <Menu />
        </Fab>
        <SwipeableDrawer
          open={state}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
          className={listContainer}
          anchor="right"
        >
          <MenuList className={list} component="nav">
            <MenuItem component={GatsbyLink} to="Hi">
              Hey
            </MenuItem>
            <MenuItem component={GatsbyLink} to="Hi">
              Hey
            </MenuItem>
            <MenuItem component={GatsbyLink} to="Hi">
              Hey
            </MenuItem>
          </MenuList>
        </SwipeableDrawer>
      </Box>
    </Hidden>
  );
}
