import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(1),

    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(0.5),
      display: 'block',
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
    minHeight: 95,

    [theme.breakpoints.down('md')]: {},
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
}));