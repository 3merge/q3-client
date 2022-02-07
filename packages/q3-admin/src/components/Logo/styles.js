import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  link: {
    display: 'block',
    height: 95,
    maxHeight: 95,
    width: 'auto',
    textAlign: 'center',
    padding: theme.spacing(2),

    [theme.breakpoints.down('lg')]: {
      display: 'block',
      maxWidth: '30vw',
    },

    [theme.breakpoints.down('md')]: {
      textAlign: 'left',
      height: 65,
      maxHeight: 65,
    },
  },
  img: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
}));
