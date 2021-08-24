import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    paddingLeft: 0,
    marginBottom: theme.spacing(1),
  },
  container: {
    paddingLeft: 0,
    paddingRight: 0,
    margin: '-0.375rem',
  },
  menu: {
    display: 'inline-block',

    '& .menu:empty ~ *': {
      display: 'none',
    },
  },
  menuItem: {
    margin: '0 !important',
    fontSize: '1rem',
  },
  invisible: {
    visibility: 'hidden',
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: -1,
    opacity: 0,
    width: 0,
    height: 0,
    display: 'block',
    overflow: 'hidden',
  },
}));
