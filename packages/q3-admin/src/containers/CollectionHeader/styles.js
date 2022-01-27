import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    zIndex: 2,
    position: 'relative',
    border: '1px solid var(--background-muted)',
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    height: 65,
    borderRadius: 0,
  },
  title: {
    fontWeight: 'bold',
    margin: '0 3rem 0 0 !important',
    fontSize: '1.33rem',
    lineHeight: 1,
  },
}));
