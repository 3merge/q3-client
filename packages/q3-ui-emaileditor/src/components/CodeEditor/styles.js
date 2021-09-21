import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  textarea: {
    display: 'none',
  },
  root: {
    height: '100%',
    width: '100%',

    '& .CodeMirror': {
      height: '100% !important',
    },
  },
  column: {
    flex: 1,
  },
}));
