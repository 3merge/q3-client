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
      height: '100% !important',
      width: '100% !important',
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
