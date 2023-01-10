import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  icon: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%',

    '& svg': {
      fontSize: '5rem',
    },
  },
  media: {
    height: 125,
    overflow: 'hidden',
    position: 'relative',
  },
  img: {
    objectFit: 'cover',
    objectPosition: 'top',
    height: '100%',
    width: '100%',
    userSelect: 'none',
  },
  loader: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },
  iphonefix: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
}));
