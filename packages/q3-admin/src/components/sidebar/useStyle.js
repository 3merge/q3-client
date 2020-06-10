import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  view: {
    height: 'calc((100 * var(--vh)))',
    overflow: 'auto',
    position: 'relative',
    zIndex: 1,

    [theme.breakpoints.down('md')]: {
      height: 'calc((100 * var(--vh)) - 68px)',
    },
  },

  articleBox: () => ({
    overflow: 'initial',

    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      overflow: 'initial',
    },
  }),
  columnWidth: {
    position: 'sticky',
    top: 0,
    height: 'calc((100 * var(--vh)))',
    width: 285,
    overflow: 'auto',
    resize: 'horizontal',

    '& > aside': {
      minWidth: 285,
    },

    [theme.breakpoints.down('md')]: {
      height: 'calc((100 * var(--vh)) - 68px)',
    },

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  docs: {
    '& p, & li': {
      fontSize: '0.933rem !important',
    },
  },

  articleWrapper: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  sectionWidth: {
    overflowY: 'auto',
    width: 'calc(100% - 495px)',
    [theme.breakpoints.down('lg')]: {
      width: 'calc(100% - 405px)',
    },

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  root: {
    backgroundColor: '#F5F7F9',
    height: '100%',
    fontSize: '1rem !important',
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'relative',
    padding: '0.1875rem',
    [theme.breakpoints.down('sm')]: {
      borderLeft: 0,
      backgroundColor: '#FFF',
      paddingTop: 0,
    },
  },
  item: {
    minWidth: 'auto',
    padding: theme.spacing(1),
    minHeight: 36,
    fontSize: '0.731rem',
    textTransform: 'uppercase',
    [theme.breakpoints.down('md')]: {
      marginTop: 0,
    },
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  launch: {
    position: 'sticky',
    top: '.5rem',
    marginTop: '1rem',
    right: '2rem',
  },
  bordered: {
    textOverflow: 'ellipsis',
    position: 'relative',
    // overflow: 'hidden',
  },
  subtext: {
    fontSize: '1rem',
  },
  paper: {
    border: 0,
    boxShadow: theme.shadows[14],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: theme.spacing(1),
    overflow: 'hidden',
    marginLeft: 92,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  drawerOpen: {
    top: '70px',
    transition: theme.transitions.create('top', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('md')]: {
      top: '30%',
    },
    [theme.breakpoints.down('sm')]: {
      top: '30%',
    },
  },
  drawerClose: {
    top: '100%',
    transition: theme.transitions.create('top', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));
