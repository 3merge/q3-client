import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  actions: {
    position: 'absolute',
    bottom: theme.spacing(2),
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  img: {
    display: 'block',
    maxHeight: '90%',
    maxWidth: '90%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },
}));
