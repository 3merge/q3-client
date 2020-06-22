import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  articleBox: ({ overflowY = 'auto' }) => ({
    overflow: 'auto',
    height: 'calc(100vh - 10px)',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },

    '&::-webkit-scrollbar': {
      height: 10,
      width: 7,
    },

    '&::-webkit-scrollbar-track': {
      background: '#E6ECF1',
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
    backgroundColor: '#F5F7F9',
    height: '100%',
    fontSize: '1rem !important',
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'relative',
    padding: '1.25rem',
    [theme.breakpoints.down('sm')]: {
      borderLeft: 0,
      backgroundColor: '#FFF',
      paddingTop: 0,
      marginLeft: 0,
    },

    '&::-webkit-scrollbar': {
      width: 4,
    },

    '&::-webkit-scrollbar-track': {
      background: '#E6ECF1',
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
    boxShadow: 'rgba(0, 0, 0, 0.045) 0px 5px 20px 0px',
    textOverflow: 'ellipsis',
    position: 'relative',
    backgroundColor: '#f6f8fa',
    padding: '.75rem',

    [theme.breakpoints.down('sm')]: {
      boxShadow: theme.shadows[0],
      backgroundColor: 'transparent',
    },
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
