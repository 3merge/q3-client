import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    borderRight: `2px solid ${theme.palette.background.muted(
      0,
    )}`,
    height: 'calc((100 * var(--vh)) - 81px)',
    overflow: 'hidden',
    padding: '.5rem 0',
    position: 'relative',
    minWidth: 285,
    maxWidth: 345,
    width: '24.5vw',

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
  },
}));
