import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    height: 'calc(100 * var(--vh))',
    overflow: 'hidden',
    padding: '0',
    position: 'relative',
    maxWidth: 355,
    minWidth: 310,
    width: '27.5vw',

    // [theme.breakpoints.down('sm')]: {
    //   height: 'auto',
    //   maxWidth: '100%',
    //   width: '100%',
    // },
  },

  scroller: {
    height: '100%',
    maxHeight: '100%',
    overflowY: 'auto !important',
    overflowX: 'hidden !important',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    width: '100%',

    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },
}));
