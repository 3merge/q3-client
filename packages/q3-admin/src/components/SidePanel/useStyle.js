import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: ({ state }) => ({
    backgroundColor: state
      ? theme.palette.background.default
      : theme.palette.background.muted,
    borderRight: `1px solid ${theme.palette.background.muted}`,
    height: 'calc((100 * var(--vh)) - 71px)',
    overflow: 'hidden',
    padding: '.5rem 0',
    position: 'relative',
    minWidth: '1.5rem',
    maxWidth: 320,
    width: state ? '25vw' : 0,
    transitionProperty: 'background,border-right,width',
    transitionDuration: 450,

    '&:hover': {
      borderColor: theme.palette.primary.light,
    },

    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      maxWidth: '100%',
      width: '100%',
    },
  }),

  icon: {
    color: theme.palette.primary.main,
    left: '50%',
    position: 'absolute',
    top: '1.85rem',
    transform: 'translateX(-50%)',
    fontSize: '1rem',
  },

  drawerBtn: ({ state }) => ({
    cursor: 'ew-resize',
    zIndex: 100,
    top: 0,
    bottom: 0,
    right: '-.75rem',
    position: 'absolute',
    width: '1.5rem',
    opacity: state ? 0 : 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    outline: 0,
    transition: 'opacity 500ms',
    '&:hover ~ div': {
      borderColor: theme.palette.primary.main,
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }),

  scroller: ({ state }) => ({
    height: '100%',
    maxHeight: '100%',
    overflowY: 'auto !important',
    overflowX: 'hidden !important',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    maxWidth: 320,
    width: '25vw',
    opacity: state ? 1 : 0,
    transition: 'opacity 150ms',
  }),
}));
