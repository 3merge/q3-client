import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  icon: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%',

    '& svg': {
      fontSize: '6.1rem',
    },
  },
  media: {
    height: 175,
    overflow: 'hidden',
    position: 'relative',
  },
  img: {
    objectFit: 'cover',
    objectPosition: 'center',
    height: '100%',
    width: '100%',
  },
}));
