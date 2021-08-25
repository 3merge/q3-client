import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  scrollPaper: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  paper: {
    padding: 0,

    maxHeight: '80vh',
    maxWidth: 550,
    width: 'auto',

    [theme.breakpoints.down('sm')]: {
      maxHeight: '100%',
      maxWidth: '100%',
      width: '100%',
    },
  },
}));
