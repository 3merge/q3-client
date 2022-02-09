import {
  darken,
  lighten,
  makeStyles,
} from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  root: {
    // nested inside q3 sub pages
    height: '80vh',
    position: 'relative',
    margin: 0,

    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
  editor: {
    width: 'calc(100% - 280px)',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  sidebar: {
    width: 280,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  wrapper: {
    backgroundColor:
      theme.palette.type === 'light'
        ? darken(grey[300], 0.02)
        : lighten(grey[900], 0.02),
    height: '100%',
    width: '100%',

    '& .cm-s-base16-light': {
      backgroundColor: grey[200],

      '& .CodeMirror-gutters': {
        backgroundColor: grey[200],
      },
    },

    '& .cm-s-base16-dark': {
      backgroundColor: grey[900],

      '& .CodeMirror-gutters': {
        backgroundColor: grey[900],
      },
    },
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
