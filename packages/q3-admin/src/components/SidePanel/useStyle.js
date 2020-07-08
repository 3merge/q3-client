import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    height: 'calc((100 * var(--vh)) - 2rem)',
    maxWidth: 310,
    width: 310,

    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      maxWidth: '100%',
      width: '100%',
    },
  },

  scroller: {
    height: '100%',
    maxHeight: '100%',
    overflowY: 'auto !important',
    overflowX: 'hidden !important',
    margin: '0 .25rem',
  },
}));
