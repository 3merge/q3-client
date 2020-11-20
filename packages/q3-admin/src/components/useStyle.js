import { makeStyles } from '@material-ui/core/styles';

// re-useable component styles
export default makeStyles((theme) => ({
  appbar: {
    minHeight: 75,

    [theme.breakpoints.down('md')]: {
      height: 65,
    },
  },

  side: ({ collapsed }) => ({
    overflow: 'hidden',
    transition: 'width 250ms',
    width: collapsed ? 0 : 255,
  }),

  main: {
    flex: 1,

    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },

    '& #q3-sidebar': {
      //  backgroundColor: theme.palette.grey[100],
    },

    '& section': {
      borderLeft: `2px solid ${theme.palette.grey[100]}`,
      //  padding: theme.spacing(0.75),
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
