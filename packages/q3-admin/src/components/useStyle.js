import { makeStyles } from '@material-ui/core/styles';

// re-useable component styles
export default makeStyles((theme) => ({
  main: {
    flex: 1,
    maxWidth: '100%',
    width: 'calc(100% - 290px)',

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },

  fillViewportHeight: {
    height: 'calc(100 * var(--vh))',
    overflow: 'auto',

    [theme.breakpoints.down('md')]: {
      height: 'calc((100 * var(--vh)) - 65px)',
    },
  },
}));
