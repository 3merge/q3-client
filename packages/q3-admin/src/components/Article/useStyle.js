import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  view: {
    margin: '0 auto',
    maxWidth: '100%',
    width: '100%',
    zIndex: 1,
  },
  articleWrapper: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
}));
