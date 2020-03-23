import { makeStyles } from '@material-ui/core/styles';
import { grey, yellow } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  tableRowHover: {
    transition: 'all 500ms',
    '&:nth-child(even)': {
      backgroundColor: grey[100],
    },
    '&>.visible-on-hover': {
      textAlign: 'right',
    },
    '&>.visible-on-hover button': {
      opacity: 0,
      transition: 'opacity 250',
    },
    '&>.visible-on-hover button:focus': {
      opacity: 1,
    },
    '&:hover>.visible-on-hover button': {
      opacity: 1,
    },
    [theme.breakpoints.down('md')]: {
      '&>.visible-on-hover button': {
        opacity: 1,
      },
    },
  },
  starred: {
    color: ({ featured }) =>
      featured ? yellow[500] : grey[200],
    '&:hover': {
      color: ({ featured }) =>
        featured ? yellow[300] : grey[500],
    },
  },
  float: {
    float: 'right',
  },
  boxes: {
    width: 45,
  },
  leader: {
    minWidth: 350,
  },
  mobile: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  rowlike: {
    background: '#FFF',
    borderBottom: '3px solid whitesmoke',
  },
  overflow: {
    maxWidth: '100%',
    overflow: 'auto',
  },
  action: {
    bottom: 0,
    boxShadow: theme.shadows[14],
    left: 0,
    position: 'fixed',
    width: '100%',
  },
  mobileCheckbox: {
    [theme.breakpoints.down('md')]: {
      float: 'right',
    },
  },
  withoutPseudo: {
    '&::before': {
      display: 'none',
    },
  },

  actionbar: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    bottom: theme.spacing(2),
    boxShadow: theme.shadows[15],
    left: '50%',
    maxWidth: '100%',
    transform: 'translateX(-50%)',
    width: 1092,
    position: 'fixed',
    zIndex: 1000000,
  },
}));
