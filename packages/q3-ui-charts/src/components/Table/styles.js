import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& td, & th': {
      padding: 4,
    },
    '& tr:nth-child(odd) td': {
      backgroundColor: theme.palette.background.default,
    },
  },
}));
