import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    borderLeft: '2px solid #f4f4f5',
    height: 'calc((100 * var(--vh)) - 75px)',
    overflow: 'hidden',
    padding: '0',
    position: 'relative',
    maxWidth: 305,
    width: 305,

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
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: '100%',

    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },
}));
