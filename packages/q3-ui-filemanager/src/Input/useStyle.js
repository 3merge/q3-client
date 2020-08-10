import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
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
}));
