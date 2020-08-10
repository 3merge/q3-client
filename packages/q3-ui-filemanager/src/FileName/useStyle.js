import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  label: {
    fontSize: '0.877rem',
    textTransform: 'uppercase',
  },
  link: {
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
  },
  mark: {
    color: theme.palette.primary.light,
    padding: theme.spacing(0.35),

    '& *': {
      fontSize: '65%',
    },
  },
}));
