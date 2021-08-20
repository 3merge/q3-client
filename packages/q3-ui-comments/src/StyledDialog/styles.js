import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  scrollPaper: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  paper: {
    maxHeight: 450,
    width: 'auto',

    [theme.breakpoints.down('lg')]: {
      maxHeight: '100%',
      width: '100%',
    },
  },
}));
