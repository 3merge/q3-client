import * as colors from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: ({ selected = false }) => ({
    backgroundColor: '#FFF',
    border: '1px solid whitesmoke',
    boxShadow: selected
      ? theme.shadows[15]
      : theme.shadows[0],
    marginBottom: theme.spacing(0.5),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
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
      boxShadow: theme.shadows[4],
    },
  }),

  editLauncher: {
    background: colors.deepOrange[50],
    color: colors.deepOrange[300],
    marginRight: theme.spacing(0.5),
  },

  removeLauncher: {
    background: colors.red[50],
    color: colors.red[300],
  },

  launchers: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
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
    color: colors.grey[500],
    display: 'block',
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
}));
