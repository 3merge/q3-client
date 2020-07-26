import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    borderLeft: '2px solid #f4f6f8',
    height: 'calc((100 * var(--vh)) - 65px)',
    padding: '0',
    position: 'relative',
    maxWidth: 310,
    width: 310,

    [theme.breakpoints.down('md')]: {
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
    width: 310,

    [theme.breakpoints.down('md')]: {
      width: 265,
    },

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
