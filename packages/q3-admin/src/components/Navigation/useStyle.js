import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f7f9',
    height: '100vh',
    position: 'sticky',
    top: 0,
    width: 265,
    zIndex: 10,

    '& .Mui-selected': {
      color: theme.palette.primary.dark,

      '& span': {
        fontWeight: 'bold',
        textDecoration: 'underline',
      },

      '& svg': {
        // fill: theme.palette.primary.contrastText,
      },
    },
  },
  nav: {
    height: 'calc(100vh - 165px)',
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
    padding: theme.spacing(1.5),
    height: 75,
    width: '100%',

    '& img': {
      mixBlendMode: 'multiply',
      height: '100%',
      objectFit: 'contain',
      width: '100%',
    },

    [theme.breakpoints.down('md')]: {
      height: 65,
      width: 130,
    },
  },
}));
