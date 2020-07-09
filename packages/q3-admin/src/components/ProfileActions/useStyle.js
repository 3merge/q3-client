import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    height: 95,

    [theme.breakpoints.down('md')]: {
      height: 'auto',
      flexDirection: 'row-reverse',
    },

    [theme.breakpoints.down('md')]: {
      height: 'auto',
      flexDirection: 'row-reverse',
    },
  },
}));
