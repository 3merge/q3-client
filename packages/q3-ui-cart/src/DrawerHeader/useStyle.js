import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  bar: {
    justifyContent: 'space-between',
    padding: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  trash: {
    style: {
      color: red[900],
      marginLeft: '0.5rem',
    },
  },
}));
