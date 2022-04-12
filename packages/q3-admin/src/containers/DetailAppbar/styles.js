import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    flexWrap: 'wrap',

    [theme.breakpoints.down('md')]: {
      minHeight: 0,
      marginBottom: theme.spacing(1),

      '& button:first-of-type': {
        marginBottom: '1rem',
      },
    },

    [theme.breakpoints.down('sm')]: {
      '& ol': {
        justifyContent: 'center',
      },
    },
  },
  toolbar: {
    justifyContent: 'space-between',
    minHeight: 0,

    [theme.breakpoints.up('lg')]: {
      minHeight: 95,
    },
  },
  nav: {
    [theme.breakpoints.down('md')]: {
      //   justifyContent: 'space-between',
      width: '100%',
      marginLeft: '-.5rem',
      marginTop: '1.5rem',
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
  titleContainer: {
    alignItems: 'center',
    marginLeft: '.35rem',

    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
    },
  },
  mobile: {
    textAlign: 'center',
    margin: '0 auto',
    width: '90vw',

    '& h1': {
      marginTop: '1.25rem',
    },

    '& .featured-photo': {
      margin: '1.5rem 0 -.25rem 0',
    },

    '& ul': {
      justifyContent: 'center',
      marginBottom: '1rem',
    },
  },
  mobileGrid: {
    flexWrap: 'nowrap',
    marginLeft: 0,
    marginTop: '.5rem',
  },
  mobileSummaryContainer: {
    '& ul': {
      display: 'flex',
      justifyContent: 'center',

      '& li': {
        fontSize: '0.833rem',
      },
    },
  },
}));
