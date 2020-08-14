import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export default makeStyles(() => ({
  box: {
    alignItems: 'center',
    display: 'flex',
    padding: '10px 18.5px',
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  button: {
    '& ::-webkit-file-upload-button': {
      background: 'transparent',
      border: 0,
      margin: 0,
      padding: 0,
      visibility: 'hidden',
      width: 0,
    },
  },
  icon: {
    marginRight: '.5rem',
    transform: 'rotate(45deg)',
  },
  root: {
    bottom: 0,
    left: 0,
    opacity: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    visibility: 'none',
  },
  remove: {
    color: red[900],
  },
}));
