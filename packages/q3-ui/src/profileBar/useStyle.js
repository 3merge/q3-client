import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  sticky: {
    position: 'sticky',
    top: 0,
  },
  trigger: {
    position: 'absolute',
    top: '8rem',
    left: 'calc(100% - 1rem)',
  },
  colourful: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[1],
    boxSizing: 'border-box',
    color: '#FFF',
    height: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingTop: theme.spacing(2),
    '& *': {
      color: '#FFF',
      fontSize: '1.11rem',
    },
  },
  mobile: {
    backgroundColor: theme.palette.primary.main,
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    width: 185,
  },
}));
