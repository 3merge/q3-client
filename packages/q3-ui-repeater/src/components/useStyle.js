import * as colors from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: ({ selected = false }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: selected
      ? theme.shadows[15]
      : theme.shadows[0],
    marginBottom: theme.spacing(0.5),
    height: '100%',
    position: 'relative',
    transitionProperty: 'box-shadow,border',
    transitionDuration: '500ms',
  }),

  addBtn: {
    cursor: 'pointer',
    padding: '1rem',
  },

  titleCls: {
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.main
        : 'inherit',
    fontSize: '0.911rem !important',
    margin: '0 !important',
    fontWeight: 'bolder',
  },

  editLauncher: {
    color: theme.palette.primary.light,
  },

  removeLauncher: {
    color: theme.palette.primary.light,
  },

  launchers: {
    position: 'absolute',
    top: theme.spacing(0),
    right: theme.spacing(0),
    padding: theme.spacing(1),

    [theme.breakpoints.down('sm')]: {
      padding: 0,
      position: 'relative',
      textAlign: 'right',
      marginTop: theme.spacing(1),
    },
  },

  attribute: {
    width: 210,

    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  tableRow: {
    '&:last-child td': {
      borderBottom: 'none !important',
    },

    [theme.breakpoints.down('sm')]: {
      border: '0 !important',
    },
  },

  tableCell: {
    backgroundColor: theme.palette.background.paper,
    display: 'table-cell',
    padding: '.75rem',

    '& [data-repeater-editable] > span > button': {
      padding: 0,
      textAlign: 'left',
    },

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      alignItems: 'flex-start',
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      lineHeight: 2,
      border: '0 !important',
      padding: '0',

      '& >div': {
        justifyContent: 'space-between !important',
        '& > div': {
          padding: '0 !important',
        },
      },
    },
  },

  tableCellHeader: {
    display: 'table-cell',
    padding: '.75rem',
    maxWidth: 575,
    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.down('sm')]: {
      display: 'block',
      border: 0,
      padding: 0,
      margin: '1rem 0',
    },
  },

  tableActions: {
    textAlign: 'right',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      display: 'block !important',
    },
  },

  tableCellLabel: {
    fontSize: '.624rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    opacity: 0.83,
    textTransform: 'uppercase',
    display: 'none',

    [theme.breakpoints.down('sm')]: {
      display: 'inline-block',
      textAlign: 'left',
      paddingTop: 6,
      '&::after': {
        content: '":"',
      },
    },
  },

  label: {
    color: colors.grey[500],
    lineHeight: 1.2,
    fontSize: '1rem',
    marginRight: '1rem',
  },

  editableContent: {
    cursor: 'pointer',
    display: 'inline-block',
  },

  editableIcon: {
    color: colors.grey[500],
    fontSize: '0.91rem',
    marginLeft: theme.spacing(1),
  },

  block: {
    display: 'block',
  },

  row: () => ({
    '& td': {
      borderBottom: `1px solid ${theme.palette.background.muted}`,
    },

    '&:first-of-type': {
      '& td': {
        '&:first-of-type': {
          borderTopLeftRadius: 16,
        },
        '&:last-of-type': {
          borderTopRightRadius: 16,
        },
      },
    },

    [theme.breakpoints.down('sm')]: {
      display: 'block',
      borderBottom: '0 !important',
      margin: '0.5rem 0',
      width: '100%',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      borderRadius: 8,

      '& td': {
        display: 'block',
        borderRadius: '0 !important',
        borderBottom: 'none !important',
        margin: 0,

        '&:first-of-type': {
          marginBottom: theme.spacing(1),
        },

        '&:last-of-type': {
          marginTop: theme.spacing(1),
          borderTop: `1px solid ${theme.palette.background.muted} !important`,
        },
      },
    },
  }),

  form: {
    minWidth: 150,
    [theme.breakpoints.down('md')]: {
      order: 1,
    },
  },

  divide: {
    borderTop: `1px solid ${theme.palette.background.muted}`,
  },

  tableHeader: {
    '& th': {
      padding: '.75rem',
      border: 0,
      backgroundColor: `${theme.palette.background.default} !important`,
    },

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
