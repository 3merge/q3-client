import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    diplay: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[1],
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 65,
      justifyContent: 'center',
    },
  },
}));
