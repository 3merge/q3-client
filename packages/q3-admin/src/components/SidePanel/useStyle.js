import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: ({ state }) => ({
    backgroundColor: theme.palette.background.default,
    borderRight: `1px solid ${theme.palette.background.muted}`,
    height: 'calc((100 * var(--vh)) - 81px)',
    overflow: 'hidden',
    padding: '.5rem 0',
    position: 'relative',
    minWidth: 35,
    maxWidth: 345,
    width: state ? '24.5vw' : 0,
    transition: 'width 250ms',

    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      maxWidth: '100%',
      width: '100%',
    },
  }),

  drawerBtn: {
    position: 'absolute',
    bottom: '.75rem',
    right: 0,
    zIndex: 100,
  },

  scroller: ({ state }) => ({
    height: '100%',
    maxHeight: '100%',
    overflowY: 'auto !important',
    overflowX: 'hidden !important',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    minWidth: 35,
    maxWidth: 345,
    width: '24.5vw',
    opacity: state ? 1 : 0,
    transition: 'opacity 150ms',
  }),
}));
