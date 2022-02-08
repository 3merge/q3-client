import { grey, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  danger: {
    color: red[900],
  },
  previewContainer: {
    height: 180,
    margin: '-4vh',
    borderRadius: 8,
    overflow: 'hidden',
  },
  fit: {
    color: grey[200],
    objectFit: 'contain',
    position: 'relative',
    height: 180,
    width: 180,
  },
  icon: {
    height: 180,
    width: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& svg': {
      height: '25%',
      width: '25%',
    },
  },
}));
