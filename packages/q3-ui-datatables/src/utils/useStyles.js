import { makeStyles } from '@material-ui/core/styles';
import { grey, yellow } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  root: {
    display: 'block',
    backgroundColor: '#FFF',
    overflow: 'hidden',

    '& th': {
      border: '0 !important',
    },

    '& tbody, & thead, & tfooter': {
      display: 'inline-block',
      minWidth: '100%',
    },

    '& tbody tr': {
      borderTop: '2px solid #F5F7F9',

      '&:hover': {
        backgroundColor: '#f9fbfd',
        transition: 'background-color 250ms',
        '& td': {
          backgroundColor: '#f9fbfd !important',
        },
      },
    },

    '& td': {
      display: 'flex',
      fontSize: '0.833rem !important',
      borderBottom: 'none !important',
      padding: '0 !important',
    },
  },

  tableHead: {
    padding: 0,
  },

  tableBody: {
    minWidth: 'max-content',
    maxWidth: 'none',
    display: 'block',
    width: 'fit-content',
  },

  cellWidth: () => ({
    display: 'flex',
    alignItems: 'center',
    transition: 'width 250ms',
    minWidth: 125,
    width: 125,
    willChange: 'width',
    height: 62,
    boxSizing: 'border-box',

    '& > div': {
      padding: '0 12px',
    },
  }),

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
    paddingLeft: 290,
    [theme.breakpoints.down('sm')]: {
      float: 'right',
    },
  },
  withoutPseudo: {
    padding: 8,
    display: 'block',
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

  cellAvatar: {
    width: 57,
    minWidth: 57,
    position: 'sticky',
    left: 0,
    padding: '.25rem',
    textAlign: 'center',
    '& div': {
      margin: '0 auto',
    },
  },

  flexRow: {
    display: 'flex !important',
    justifyContent: 'flex-end',
    flexWrap: 'nowrap',
    minWidth: 'max-content',
  },

  cellHeader: {
    position: 'sticky',
    backgroundColor: '#FFF',
    left: 0,
    transition: 'box-shadow 250ms',
    margin: 0,
    marginRight: 'auto',

    padding: 0,
    minWidth: 325,
    width: 325,
    zIndex: 1,

    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none !important',
      position: 'static',
      width: 'auto',
    },
  },

  cellHeaderWrapper: {
    boxSizing: 'border-box',
    height: 62,
    padding: '.35rem 0.5rem',
    margin: 0,
    width: 325,

    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },

  cellHeaderLink: {
    color: theme.palette.primary.main,
    display: 'inline-block',
  },

  grids: ({ elevated }) => ({
    userSelect: 'none',

    '& .liftup': {
      boxShadow: elevated ? theme.shadows[10] : 'none',
    },
  }),

  headers: () => ({
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    maxWidth: '100%',
  }),
}));
