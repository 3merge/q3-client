import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  root: {
    border: '2px solid whitesmoke',
    background: '#FFF',
    height: '100%',
    width: 255,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(8),
      position: 'fixed',
      left: theme.spacing(2),
      right: theme.spacing(2),
      bottom: theme.spacing(2),
      top: theme.spacing(2),
      height: 'auto',
      width: 'auto',
    },
  },
  overflow: {
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflowY: 'auto',
  },
  trigger: {
    marginLeft: '-1.5rem',
    position: 'fixed',
    top: '82%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      left: theme.spacing(0.5),
      position: 'fixed',
      top: '95%',
    },
  },
}));
