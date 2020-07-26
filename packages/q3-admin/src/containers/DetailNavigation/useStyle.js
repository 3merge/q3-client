import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2.5),
    paddingTop: theme.spacing(0.5),

    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
}));
