import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  link: {
    display: 'block',
    margin: '0 auto',
    height: 65,
    width: 65,
  },
  img: {
    objectFit: 'contain',
    objectPosition: 'center',
    height: '100%',
    width: '100%',
  },
}));
