import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    fontSize: '0.901rem',
    textDecoration: 'underline',
  },
  fill: {
    flex: 1,
  },
  column: {
    padding: theme.spacing(2),
    width: 255,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  wrapper: {
    padding: theme.spacing(2.5),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5),
      marginTop: theme.spacing(1),
    },
  },
}));
