import { makeStyles } from '@material-ui/core/styles';

// re-useable component styles
export default makeStyles((theme) => ({
  appbar: {
    height: 75,

    [theme.breakpoints.down('md')]: {
      height: 65,
    },
  },

  side: ({ collapsed }) => ({
    overflow: 'hidden',
    transition: 'width 250ms',
    width: collapsed ? 55 : 255,
  }),

  main: {
    flex: 1,

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
  },

  muted: {
    backgroundColor: '#f4f4f5',
  },

  light: {
    backgroundColor: '#FFF',
  },
}));
