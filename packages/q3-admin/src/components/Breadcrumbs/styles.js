import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    fontSize: '.833rem',
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),

    '& ol': {
      lineHeight: '1rem !important',
    },

    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(1),
    },
  },
  font: {
    fontSize: '.833rem',
    fontWeight: 'bold',
  },
  separator: {
    fontSize: '1rem',
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.light,
    width: '1rem',
    height: '1rem',
    textAlign: 'center',
    borderRadius: 4,
  },
}));
