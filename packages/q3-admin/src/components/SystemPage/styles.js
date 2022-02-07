import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  app: {
    backgroundColor: theme.palette.background.default,
  },
  toolbar: {
    [theme.breakpoints.up('lg')]: {
      minHeight: 95,
    },
  },
  view: {
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(2),
    },

    '& #q3-email': {
      height: '75vh',
    },
  },
}));
