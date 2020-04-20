import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: 225,
    [theme.breakpoints.down('lg')]: {
      width: 200,
    },
    [theme.breakpoints.down('md')]: {
      width: 175,
    },
    [theme.breakpoints.down('sm')]: {
      width: 115,
    },
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  fit: {
    position: 'relative',
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
  img: {
    height: 115,
    [theme.breakpoints.down('md')]: {
      height: 95,
    },
    [theme.breakpoints.down('sm')]: {
      height: 65,
    },
  },
}));
