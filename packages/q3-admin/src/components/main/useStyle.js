import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  offsetHeight: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  sticky: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  muted: {
    flex: '1',
    position: 'relative',
    width: 1,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  contrastBg: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: theme.spacing(3),
    minHeight: '100vh',
    '& *.Mui-selected': {
      background: 'rgba(255, 255, 255, 0.04)',
    },
    textAlign: 'center',
  },
  float: {
    position: 'absolute',
    right: '1rem',
    top: '1rem',
    zIndex: 10,
  },
  trigger: {
    position: 'absolute',
    top: '5rem',
    left: 'calc(100% - 1rem)',
  },
}));
