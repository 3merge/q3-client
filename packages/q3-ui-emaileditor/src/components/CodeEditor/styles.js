import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  textarea: {
    display: 'none',
  },
  root: {
    height: '100%',
    width: '100%',
    flexWrap: 'nowrap',

    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
    },

    '& .CodeMirror': {
      padding: '1rem 0',
      height: '100% !important',
      width: '100% !important',
      maxHeight: '80vh',

      [theme.breakpoints.down('sm')]: {
        maxHeight: 'none !important',
      },
    },
  },
  column: {
    flex: 1,

    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      minWidth: 'initial',
    },
  },
}));
