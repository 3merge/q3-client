import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    height: 'calc((100 * var(--vh)) - 75px)',
    overflow: 'hidden',
    position: 'relative',
    maxWidth: 295,
    width: 295,

    [theme.breakpoints.down('md')]: {
      height: 'calc((100 * var(--vh)) - 65px)',
      maxWidth: 265,
      width: 265,
    },

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
    width: '100%',
  },
}));
