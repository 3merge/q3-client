import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: '#FFF',
    borderRadius: 2,
    boxSizing: 'border-box',
    marginRight: theme.spacing(1),
    maxWidth: '100%',
    padding: theme.spacing(0.5),
    width: '100%',

    [theme.breakpoints.down('md')]: {
      backgroundColor: '#e2e7ec',
    },

    [theme.breakpoints.down('sm')]: {
      backgroundColor: '#fff',
      marginRight: 0,
      paddingLeft: theme.spacing(1.25),
      width: 60,
    },
  },
}));
