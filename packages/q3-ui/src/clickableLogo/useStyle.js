import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    width: 225,
  },
  fit: {
    position: 'relative',
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
  img: {
    height: 115,
  },
}));
