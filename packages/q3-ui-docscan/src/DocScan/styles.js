import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',

    '& video,& canvas': {
      backgroundColor: theme.palette.primary.main,
      left: 0,
      position: 'absolute',
      top: 0,
    },

    '& canvas': {
      zIndex: 1,
    },
  },
}));
