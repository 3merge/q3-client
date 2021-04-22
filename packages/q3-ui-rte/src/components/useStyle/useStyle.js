import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  paper: {},
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
      },
    },
  },
  toolbar: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
    padding: theme.spacing(1),
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
