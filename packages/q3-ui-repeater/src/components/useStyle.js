import * as colors from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: ({ selected = false }) => ({
    backgroundColor: '#FFF',
    border: '1px solid #c4c4c4',
    boxShadow: selected
      ? theme.shadows[15]
      : theme.shadows[0],
    borderRadius: 3,
    marginBottom: theme.spacing(0.5),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(9),
    paddingTop: theme.spacing(2),
    position: 'relative',
    transitionProperty: 'box-shadow,border',
    transitionDuration: '500ms',

    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(0),
      paddingTop: theme.spacing(2),
    },

    '&:hover': {
      borderColor: theme.palette.primary.main,
      boxShadow: theme.shadows[4],
    },
  }),

  editLauncher: {
    color: colors.deepOrange[300],
  },

  removeLauncher: {
    color: colors.red[300],
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

  label: {
    color: colors.grey[700],
    display: 'block',
    fontWeight: 600,
    lineHeight: 1.2,
    fontSize: '1rem',
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

  actionBar: {
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
