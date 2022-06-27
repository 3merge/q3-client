import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',

    [theme.breakpoints.up('lg')]: {
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(2),
    },
  },
}));
