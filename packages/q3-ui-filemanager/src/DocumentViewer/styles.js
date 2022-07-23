import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  appbar: {
    backgroundColor: 'rgb(0,0,0,.1)',
    color: theme.palette.primary.contrastText,
  },
  backdrop: {
    backgroundColor: 'rgb(0,0,0,.75)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  content: {
    marginTop: 65,
    maxHeight: 'calc(100% - 65px)',
    overflow: 'auto',

    '& canvas': {
      display: 'block',
      margin: 'auto',
    },

    '& .unsupported-message': {
      background: 'transparent',
    },

    '& img, & .photo-viewer-container': {
      height: 'auto !important',
      width: 'auto !important',
    },

    '& .previewer-loader': {
      display: 'none',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },

    '& [data-printing]': {
      opacity: 0,

      '& ~ .previewer-loader': {
        display: 'block',
      },
    },
  },
}));
