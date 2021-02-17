import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  container: {
    borderBottom: '2px solid #F5F7F9',
    flexDirection: 'row-reverse',
    margin: 0,
    padding: '.5rem .25rem',
    height: '64px !important',
  },
  content: {
    padding: 0,
  },
  root: {
    boxShadow: 'none',
    margin: '0 !important',
  },
  text: {
    marginLeft: '1rem',
  },
}));
