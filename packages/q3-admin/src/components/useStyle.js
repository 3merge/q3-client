import { makeStyles } from '@material-ui/core/styles';

// re-useable component styles
export default makeStyles(() => ({
  main: {
    flex: 1,
    maxWidth: '100%',
  },

  fillViewportHeight: {
    height: 'calc((100 * var(--vh)) - 65px)',
    overflow: 'auto',
  },
}));
