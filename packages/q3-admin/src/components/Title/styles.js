import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    margin: '0 !important',
    fontWeight: 'bold',
    fontSize: '1.33rem',

    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
  },
}));
