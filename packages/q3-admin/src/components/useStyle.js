import { makeStyles } from '@material-ui/core/styles';

// re-useable component styles
export default makeStyles((theme) => ({
  appbar: {
    height: 75,

    [theme.breakpoints.down('md')]: {
      height: 65,
    },
  },
  fillViewportHeight: {
    height: 'calc((100 * var(--vh)) - 65px)',
    [theme.breakpoints.down('sm')]: {
      height: 'calc((100 * var(--vh)) - 130px)',
    },
  },
}));
