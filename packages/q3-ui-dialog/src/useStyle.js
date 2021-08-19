import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: {
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    userSelect: 'none',

    [theme.breakpoints.down('md')]: {
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    },
  },
}));
