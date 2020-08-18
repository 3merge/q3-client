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
      backgroundColor: 'rgb(231 232 232)',
    },

    [theme.breakpoints.down('sm')]: {
      backgroundColor: '#f5f7f9',
      marginRight: 0,
    },
  },
}));
