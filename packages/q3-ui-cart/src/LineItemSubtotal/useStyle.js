import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    fontWeight: 'bold',
  },
  icon: {
    fontSize: '1rem',
    marginRight: theme.spacing(0.25),
  },
}));
