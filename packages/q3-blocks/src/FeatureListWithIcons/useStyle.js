import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  header: {
    display: 'flex',
    fontSize: '1.11rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  body: {
    fontSize: '0.901rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.812rem',
    },
  },
  icon: {
    color: theme.palette.secondary.main,
    width: 'auto',
  },
  section: {
    flex: 1,
  },
}));
