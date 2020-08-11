import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  link: {
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
    fontSize: '.812rem',
  },
  mark: {
    color: theme.palette.primary.light,
    padding: theme.spacing(0.35),

    '& *': {
      fontSize: '65%',
    },
  },
}));
