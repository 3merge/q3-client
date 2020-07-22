import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: ({ open }) => ({
    borderLeft: '2px solid #f4f6f8',
    borderRight: '2px solid #f4f6f8',
    height: 'calc((100 * var(--vh)) - 65px)',
    padding: '1rem 0',
    position: 'relative',
    maxWidth: 310,
    transition: 'width 500ms',
    width: open ? 310 : 0,

    [theme.breakpoints.down('md')]: {
      maxWidth: 265,
      width: 265,
    },

    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      maxWidth: '100%',
      width: '100%',
    },
  }),

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
