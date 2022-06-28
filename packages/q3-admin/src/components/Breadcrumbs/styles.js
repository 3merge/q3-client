import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    fontSize: '.833rem',
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),

    '& ol': {
      lineHeight: '1rem !important',
      flexWrap: 'nowrap',
    },

    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(1),
    },
  },
  font: {
    fontSize: '.833rem',
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('lg')]: {
      maxWidth: 115,
    },
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
  wrapper: {
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      justifyContent: 'space-between',
    },
  },
}));
