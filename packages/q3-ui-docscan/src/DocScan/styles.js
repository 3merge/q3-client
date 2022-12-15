import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: '100%',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',

    '& video,& canvas': {
      backgroundColor: theme.palette.primary.main,
      left: '50%',
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%,-50%)',
    },

    '& canvas': {
      zIndex: 1,
    },
  },
}));
