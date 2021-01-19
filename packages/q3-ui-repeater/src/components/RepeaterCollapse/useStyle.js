import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  container: {
    borderBottom: '2px solid #F5F7F9',
    flexDirection: 'row-reverse',
    margin: 0,
    padding: '.5rem .25rem',
    minHeight: 36,
    height: 36,
  },
  content: {
    padding: 0,
  },
  root: {
    boxShadow: 'none',
  },
  text: {
    marginLeft: '1rem',
  },
}));
