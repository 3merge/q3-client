import { makeStyles } from '@material-ui/core/styles';
import { grey, yellow } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    whiteSpace: 'wrap !important',

    '& th': {
      backgroundColor: theme.palette.background.paper,
      border: '0 !important',
      left: 'auto',
      borderBottom: 0,
      whiteSpace: 'wrap',
      position: 'sticky',
      top: 0,
      zIndex: 3,
    },

    '& thead tr': {},

    '& tbody, & thead, & tfooter': {},

    '& tbody tr': {
      borderTop: `1px solid ${theme.palette.background.muted}`,

      '&:hover': {
        backgroundColor: theme.palette.background.default,
        transition: 'background-color 250ms',
        '& td': {
          backgroundColor: `${theme.palette.background.default} !important`,
        },
      },
    },

    '& td': {
      borderTop: `1px solid ${theme.palette.background.muted}`,
      fontSize: '0.833rem !important',
      borderBottom: 'none !important',
      padding: '0 !important',
    },

    '& td, & th': {
      '&:nth-child(2)': {
        paddingLeft: '1.5rem !important',
      },
    },
  },

  tableHead: {
    padding: 0,
  },

  tableBody: {},

  cellWidth: () => ({
    // alignItems: 'center',
    transition: 'width 250ms',

    willChange: 'width',
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
    backgroundColor: theme.palette.background.paper,
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

    [theme.breakpoints.down('sm')]: {
      position: 'static',
      width: 'auto',
    },
  },

  flexRow: {
    minWidth: 'max-content',
  },

  cellHeader: {
    position: 'var(--cell-position)',
    backgroundColor: theme.palette.background.paper,
    left: 0,
    transition: 'box-shadow 250ms',
    margin: 0,
    marginRight: 'auto',

    padding: 0,
    zIndex: 1,

    [theme.breakpoints.down('sm')]: {
      // boxShadow: 'none !important',
      position: 'static',
      width: 'auto',
    },
  },

  cellHeaderWrapper: {
    boxSizing: 'border-box',
    padding: '.35rem 0.5rem',
    width: 'max-content',
    margin: 0,
  },

  cellHeaderLink: {
    color: 'inherit',
    display: 'block',
    '& small': {
      maxWidth: 'max-content',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingRight: '1rem',
      wordBreak: 'normal',
      whiteSpace: 'break-spaces',
    },
  },

  grids: () => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'baseline',

    '& table': {
      userSelect: 'none',
    },
    '& td.liftup': {
      wordWrap: 'break-word',
      zIndex: 2,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  }),

  headers: () => ({
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: theme.palette.background.paper,
    overflow: 'hidden',
    maxWidth: '100%',
  }),
}));
