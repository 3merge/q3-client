import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  columnWidth: ({ height }) => ({
    height,
    width: 495,
    [theme.breakpoints.down('lg')]: {
      width: 405,
    },
    [theme.breakpoints.down('md')]: {
      width: 315,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }),
  sectionWidth: {
    overflowY: 'auto',
    width: 'calc(100% - 495px)',
    [theme.breakpoints.down('lg')]: {
      width: 'calc(100% - 405px)',
    },
    [theme.breakpoints.down('md')]: {
      width: 'calc(100% - 315px)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  root: {
    borderTop: '2px solid whitesmoke',
    height: '100%',
    fontSize: '1rem !important',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  item: {
    minWidth: 'auto',
    padding: 0,
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  launch: {
    marginBottom: theme.spacing(0.5),

    '& svg': {
      marginRight: theme.spacing(1),
    },
  },
  bordered: {
    textOverflow: 'ellipsis',
    position: 'relative',
    overflow: 'hidden',
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
  },
  drawerOpen: {
    top: '20vh',
    transition: theme.transitions.create('top', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    top: 'calc(100% - 58px)',
    transition: theme.transitions.create('top', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));
