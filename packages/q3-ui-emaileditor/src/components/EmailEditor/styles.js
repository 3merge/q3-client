import {
  darken,
  lighten,
  makeStyles,
} from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  root: {
    height: '100%',
    position: 'relative',
    margin: 0,
  },
  wrapper: {
    backgroundColor:
      theme.palette.type === 'light'
        ? darken(grey[200], 0.02)
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
}));
