import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  caption: {
    transform: 'translate(-50%,-50%)',
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: theme.spacing(0.5),
    borderRadius: 4,
    top: '50%',
    left: '50%',
    position: 'absolute',
    zIndex: 10,
  },
  svg: {
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: 10,

    '& ~ #capture': {
      display: 'block !important',
    },
  },
}));
