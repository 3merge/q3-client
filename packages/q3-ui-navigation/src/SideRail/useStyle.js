import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette: { primary } }) => ({
  container: {
    height: '100%',
    position: 'relative',
    width: '100%',
  },
  root: {
    backgroundColor: primary.dark,
    color: primary.contrastText,
    display: 'inline-block',
    height: '100vh',
    position: 'relative',
    width: '6rem',
  },
}));
