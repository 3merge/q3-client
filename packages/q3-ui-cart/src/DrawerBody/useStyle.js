import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    width: '775px',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
