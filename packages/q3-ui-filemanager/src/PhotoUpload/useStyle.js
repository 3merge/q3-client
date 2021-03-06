import { grey, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  danger: {
    color: red[900],
  },
  previewContainer: {
    height: 250,
  },
  fit: {
    color: grey[200],
    height: '100%',
    objectFit: 'contain',
    position: 'relative',
    width: '100%',
  },
}));
