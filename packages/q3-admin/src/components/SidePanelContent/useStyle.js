import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  bordered: {
    borderRadius: 5,
    textOverflow: 'ellipsis',
    position: 'relative',
  },
  subtext: {
    fontSize: '1rem',
  },
}));
