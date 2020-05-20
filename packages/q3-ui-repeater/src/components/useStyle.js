import * as colors from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: ({ selected = false }) => ({
    backgroundColor: '#FFF',
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
    color: theme.palette.primary.light,
    fontWeight: '600',
    fontSize: '1.049rem',
    margin: '0 !important',
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

  tableRow: {},

  tableCell: {
    display: 'table-cell',
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      border: '0 !important',

      '& >div': {
        display: 'contents !important',
        '& > div': {
          padding: '0 !important',
        },
      },
    },
  },

  tableCellHeader: {
    display: 'table-cell',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      border: 0,
    },
  },

  tableCellActions: {
    display: 'table-cell',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      border: 0,
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

  row: ({ hasNested }) => ({
    '& td': {
      borderBottom: hasNested ? 'none' : undefined,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      borderBottom: '2px solid #F5F7F9 !important',
      marginBottom: '0.25rem',
      width: '100%',
    },
  }),
}));
