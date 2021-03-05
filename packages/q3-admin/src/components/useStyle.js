import { makeStyles } from '@material-ui/core/styles';

// re-useable component styles
export default makeStyles(() => ({
  appbar: {},

  main: {
    flex: 1,
    maxWidth: '100%',
  },

  fillViewportHeight: {
    height: 'calc((100 * var(--vh)) - 90px)',
    overflow: 'auto',
  },

  muted: {
    backgroundColor: '#f4f4f5',
  },

  light: {
    backgroundColor: '#FFF',
  },
}));
