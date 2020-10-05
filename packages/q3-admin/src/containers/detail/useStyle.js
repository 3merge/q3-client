import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    fontSize: '0.901rem',
    textDecoration: 'underline',
  },
  fill: {
    flex: 1,
    maxWidth: '100%',
  },
  column: {
    padding: theme.spacing(2),
    width: 255,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  docs: {
    padding: '0 2rem',

    '& p': {
      fontSize: '0.812rem !important',
    },
  },
}));
