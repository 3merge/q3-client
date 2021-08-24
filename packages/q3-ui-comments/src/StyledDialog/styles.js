import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  scrollPaper: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  paper: {
    maxHeight: '80vh',
    maxWidth: 550,
    width: 'auto',

    [theme.breakpoints.down('sm')]: {
      maxHeight: '85vh',
      maxWidth: '100%',
      width: '100%',
    },
  },
}));
