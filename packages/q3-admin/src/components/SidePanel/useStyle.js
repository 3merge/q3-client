import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    borderLeft: '2px solid #f4f6f8',
    borderRight: '2px solid #f4f6f8',
    height: 'calc((100 * var(--vh)) - 65px)',
    padding: '1rem 0',
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
    // margin: '0 .25rem',
  },
}));
