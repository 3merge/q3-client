import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  link: {
    display: 'block',
    maxHeight: 120,
    height: '100%',
    width: 'auto',

    [theme.breakpoints.down('lg')]: {
      display: 'block',
      height: 65,
      maxHeight: 65,
      maxWidth: '30vw',
    },
  },
  img: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
}));
