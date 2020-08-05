import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  muted: {
    backgroundColor: '#f5f7f9',
  },
  root: {
    height: '100vh',
    position: 'sticky',
    top: 0,
    width: 265,
    zIndex: 10,

    '& .Mui-selected': {
      // color: theme.palette.primary.dark,

      '& svg': {
        // fill: theme.palette.primary.contrastText,
      },
    },
  },
  appbar: {
    height: 65,
  },
  nav: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    display: 'flex',
    height: 'calc(100vh - 75px)',
    padding: theme.spacing(1.5),
  },
  actions: {
    height: 95,
  },
  logo: {
    backgroundColor: '#f5f7f9',
    display: 'block',
    fill: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(1),
    padding: '.75rem',
    height: 75,
    width: '100%',

    '& img': {
      mixBlendMode: 'multiply',
      height: '100%',
      objectFit: 'contain',
      width: '100%',
    },

    [theme.breakpoints.down('md')]: {
      padding: '.25rem',
      height: '100%',
      width: 120,

      '& img': {
        objectPosition: 'left',
      },
    },

    [theme.breakpoints.down('sm')]: {
      left: '50%',
      position: 'absolute',
      zIndex: 1,
      height: 65,
      padding: 0,
      transform: 'translateX(-50%)',
      width: '25vw',
    },
  },
  menuItem: {
    alignItems: 'center',
    display: 'flex',
    padding: theme.spacing(0.5),
    textDecoration: 'none !important',

    '& svg': {
      marginRight: theme.spacing(0.75),
    },
  },
}));
