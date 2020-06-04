import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    margin: '0 1rem',
    maxWidth: '100%',
    width: 450,
    [theme.breakpoints.down('xl')]: {
      width: 400,
    },
    [theme.breakpoints.down('lg')]: {
      width: 350,
    },
    [theme.breakpoints.down('md')]: {
      width: 295,
    },
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
}));
