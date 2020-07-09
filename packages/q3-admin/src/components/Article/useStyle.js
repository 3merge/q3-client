import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  view: {
    backgroundColor: '#FFF',
    position: 'relative',
    width: '100%',
    zIndex: 1,
  },
  articleWrapper: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  section: {},
}));
