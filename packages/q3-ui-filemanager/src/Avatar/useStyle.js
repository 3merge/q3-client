import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  previewContainer: {
    height: 250,
  },
  fit: {
    height: '100%',
    objectFit: 'contain',
    position: 'relative',
    width: '100%',
  },
}));
