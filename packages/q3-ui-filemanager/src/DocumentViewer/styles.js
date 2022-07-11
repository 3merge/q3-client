import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  appbar: {
    backgroundColor: 'rgb(0,0,0,.1)',
    color: theme.palette.primary.contrastText,
  },
  backdrop: {
    backgroundColor: 'rgb(0,0,0,.75)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  content: {
    alignItems: 'center',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 64,
  },
}));
