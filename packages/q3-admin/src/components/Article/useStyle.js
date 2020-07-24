import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  view: {
    borderLeft: '2px solid #f4f6f8',
    backgroundColor: '#FFF',
    position: 'relative',
    width: '100%',
    zIndex: 1,

    [theme.breakpoints.down('sm')]: {
      border: 'none',
    },
  },
  articleWrapper: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  section: {},
}));
