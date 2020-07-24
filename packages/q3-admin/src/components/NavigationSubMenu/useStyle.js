import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    fontSize: '0.911rem',

    '&.active': {
      color: theme.palette.primary.dark,
    },
  },
}));
