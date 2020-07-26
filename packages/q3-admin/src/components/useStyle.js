import { makeStyles } from '@material-ui/core/styles';

// re-useable component styles
export default makeStyles((theme) => ({
  appbar: {
    height: 75,

    [theme.breakpoints.down('md')]: {
      height: 65,
    },
  },

  main: {
    flex: 1,
    maxWidth: 'calc(100% - 265px)',

    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },

  fillViewportHeight: {
    height: 'calc((100 * var(--vh)) - 75px)',
    overflow: 'auto',

    [theme.breakpoints.down('md')]: {
      height: 'calc((100 * var(--vh)) - 65px)',
    },

    [theme.breakpoints.down('sm')]: {
      height: 'calc((100 * var(--vh)) - 130px)',
    },
  },

  muted: {
    backgroundColor: '#f5f7f9',
  },

  light: {
    backgroundColor: '#FFF',
  },
}));
