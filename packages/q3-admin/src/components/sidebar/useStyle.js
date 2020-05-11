import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  articleBox: ({ overflowY = 'auto' }) => ({
    overflowY,
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },

    '&::-webkit-scrollbar': {
      width: '5px',
    },

    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },

    /* Handle */
    '&::-webkit-scrollbar-thumb': {
      background: '#DDD',
    },

    /* Handle on hover */
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#EEE',
    },
  }),
  columnWidth: {
    height: '100vh',
    width: 325,

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
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
    backgroundColor: 'whitesmoke',
    height: '100%',
    fontSize: '1rem !important',
    overflowY: 'scroll',
    overflowX: 'hidden',
    position: 'relative',
    padding: '1rem 1rem',
    [theme.breakpoints.down('md')]: {
      borderLeft: 0,
      backgroundColor: '#FFF',
      marginLeft: 95,
      paddingTop: 0,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },

    '&::-webkit-scrollbar': {
      width: '5px',
    },

    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },

    /* Handle */
    '&::-webkit-scrollbar-thumb': {
      background: '#DDD',
    },

    /* Handle on hover */
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#EEE',
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
    backgroundColor: 'transparent',
    border: 0,
    outline: 0,
    padding: '0 1rem',
    lineHeight: '45px',
    textAlign: 'center',
    textTransform: 'uppercase',
    cursor: 'pointer',
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
      top: '96px',
    },
    [theme.breakpoints.down('sm')]: {
      top: '70px',
    },
  },
  drawerClose: {
    top: 'calc(100% - 70px)',
    transition: theme.transitions.create('top', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));
