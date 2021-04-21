import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  paper: ({ fullscreen }) =>
    fullscreen
      ? {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10000,
          height: '100%',
          overflow: 'auto',
        }
      : {
          maxHeight: '100vh',
          overflow: 'auto',
          margin: `${theme.spacing(1)} auto`,
        },
  root: {
    position: 'relative',

    '& .ql-editor': {
      overflow: 'hidden',
      outline: 0,
      padding: theme.spacing(1),
      position: 'relative',

      '& > *': {
        margin: '.25rem !important',
      },

      '& img': {
        cursor: 'pointer',
        display: 'block',
        padding: '.5rem',
      },

      '& .ql-align-center': {
        textAlign: 'center',
      },

      '& .ql-align-left': {
        textAlign: 'left',
      },

      '& .ql-align-right': {
        textAlign: 'right',
      },

      '& .ql-indent-1': {
        textIndent: '1rem !important',
      },
      '& .ql-indent-2': {
        textIndent: '2rem !important',
      },
      '& .ql-indent-3': {
        textIndent: '3rem !important',
      },
      '& .ql-indent-4': {
        textIndent: '4rem !important',
      },
      '& .ql-indent-5': {
        textIndent: '5rem !important',
      },
      '& .ql-indent-6': {
        textIndent: '6rem !important',
      },
      '& .ql-indent-7': {
        textIndent: '7rem !important',
      },
      '& .ql-indent-8': {
        textIndent: '8rem !important',
      },
    },
  },
  toolbar: {
    padding: theme.spacing(1.5),
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    border: `1px solid ${theme.palette.secondary.main}`,
    userSelect: 'none',
    userDrag: 'none',
  },
}));

export default useStyle;
