import { makeStyles } from '@material-ui/core/styles';
import { grey, yellow } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: '#FFF',
    '& td': {
      [theme.breakpoints.down('sm')]: {
        border: 0,
        display: 'block',
        '&::before': {
          content: 'attr(data-title)',
          textTransform: 'uppercase',
          marginRight: '1rem',
          fontSize: '0.833rem',
        },
      },
    },
  },
  tableHead: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      width: '100% !important',
    },
  },
  row: {
    '&:hover': {
      backgroundColor: '#f9fbfd',
      transition: 'background-color 250ms',
    },
    [theme.breakpoints.down('sm')]: {
      borderBottom: `2px solid #E6ECF1`,
      display: 'block',
      padding: theme.spacing(1),
    },
  },
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
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  rowlike: {
    background: '#FFF',
    borderBottom: '3px solid #F5F7F9',
  },
  overflow: {
    maxWidth: '100%',
    position: 'relative',
  },
  expand: {
    flex: 1,
    width: '100%',
  },
  action: {
    bottom: 0,
    boxShadow: theme.shadows[14],
    left: 0,
    position: 'fixed',
    width: '100%',
  },
  mobileCheckbox: {
    [theme.breakpoints.down('sm')]: {
      float: 'right',
    },
  },
  withoutPseudo: {
    minWidth: 270,
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
    },

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

    '&>span': {
      flex: 1,
      maxWidth: 168,
      minWidth: 80,

      display: 'inline-flex',
      position: 'relative',
      alignItems: 'center',

      verticalAlign: 'middle',
      justifyContent: 'center',
    },
  },
  trigger: {
    borderRadius: 3,
  },
  sticky: {
    width: 'auto',
    position: 'sticky',
    top: 0,

    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      width: '100%',
    },
  },

  navigator: {
    position: 'absolute',
    top: 0,
    left: 0,

    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      left: theme.spacing(1),
      bottom: theme.spacing(1),
      top: 'auto',
      zIndex: 100,
    },
  },
}));
