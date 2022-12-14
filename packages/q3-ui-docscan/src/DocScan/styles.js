import { makeStyles } from '@material-ui/core';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../constants';

export default makeStyles(() => ({
  root: {
    height: CLIENT_HEIGHT,
    width: CLIENT_WIDTH,
    position: 'relative',
    overflow: 'hidden',

    '& video,& canvas': {
      left: 0,
      position: 'absolute',
      top: 0,
    },

    '& canvas': {
      height: CLIENT_HEIGHT,
      width: CLIENT_WIDTH,
      zIndex: 1,
    },
  },
}));
