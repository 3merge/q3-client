import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  button: {
    bottom: theme.spacing(1),
    left: '50%',
    transform: 'translateX(-50%)',
    position: 'absolute',
    zIndex: 2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));
