import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  nav: {
    backgroundColor: theme.palette.background.paper,
    height: 'calc(100 * var(--vh))',
    position: 'relative',
    width: 245,
    zIndex: 10,

    '& > div > a': {
      maxHeight: 80,
      marginBottom: theme.spacing(3),
    },
  },
  appbar: {
    boxShadow: theme.shadows[1],
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: 65,
    padding: `0 ${theme.spacing(1)}`,
    width: '100%',
    zIndex: 0,
  },
  paper: {
    borderRadius: 0,
    overflowX: 'auto',
    padding: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
  },
  buttonLink: {
    '&.active': {
      color: theme.palette.secondary.main,
    },
  },
  contents: {
    overflowX: 'hidden',
    [theme.breakpoints.down('md')]: {
      margin: '-1.5rem',
    },
  },
}));
