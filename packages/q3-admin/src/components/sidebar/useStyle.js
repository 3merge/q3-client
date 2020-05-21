import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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
    height: '100vh',
    width: 325,
    overflow: 'auto',
    resize: 'horizontal',

    '& > div': {
      minWidth: 275,
    },

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  articleWrapper: {
    [theme.breakpoints.down('md')]: {
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
    [theme.breakpoints.down('sm')]: {
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
    padding: '1.25rem',
    [theme.breakpoints.down('md')]: {
      borderLeft: 0,
      backgroundColor: '#FFF',
      marginLeft: 95,
      paddingTop: 0,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
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
