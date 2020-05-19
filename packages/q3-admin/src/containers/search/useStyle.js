import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    width: 450,
    [theme.breakpoints.down('md')]: {
      width: 400,
    },
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
}));
