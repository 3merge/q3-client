import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  nav: {
    backgroundColor: theme.palette.background.paper,
    height: 'calc(100 * var(--vh))',
    position: 'relative',
    width: 290,
    zIndex: 10,

    '& > div > a': {
      maxHeight: 80,
      marginBottom: theme.spacing(3),
    },
  },
  appbar: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: 65,
    justifyContent: 'space-between',
    padding: `0 ${theme.spacing(1.5)}`,
    width: '100%',

    [theme.breakpoints.down('md')]: {
      borderBottom: `1px solid ${theme.palette.background.default}`,
      boxShadow: 'none',
    },
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
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.background.muted
        : theme.palette.background.paper,
  },
  buttonLink: {
    '&.active': {
      color: theme.palette.secondary.main,
    },
  },
}));
