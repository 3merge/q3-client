import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  alerts: {
    marginBottom: '.75rem',
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(0.5),
    },
  },
}));
