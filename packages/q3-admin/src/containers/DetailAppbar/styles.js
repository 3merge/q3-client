import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1),
    },

    [theme.breakpoints.down('sm')]: {
      display: 'block',
      marginBottom: theme.spacing(0),

      '& > div': {
        display: 'block',
      },
      '& h1': {
        marginTop: theme.spacing(1),
      },
      '& ol': {
        justifyContent: 'center',
      },
    },
  },
  toolbar: {
    justifyContent: 'space-between',

    [theme.breakpoints.up('lg')]: {
      minHeight: 95,
    },
  },
  nav: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-between',
      width: '100%',
    },
  },
  toggle: {
    marginTop: theme.spacing(1),
    '& ~ div aside > span': {
      display: 'none',
    },

    '& ~ div aside > a': {
      textDecoration: 'underline',
    },

    '& ~ div aside > *': {
      textAlign: 'center',
    },
  },
  meta: {
    maxWidth: '100%',
    width: 480,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  root: {
    background: theme.palette.background.default,
  },
}));
