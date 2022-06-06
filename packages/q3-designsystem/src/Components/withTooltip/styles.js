import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  arrow: {
    color: theme.palette.primary.dark,
  },
  tooltip: {
    backgroundColor: theme.palette.primary.dark,
  },
  indicator: {
    cursor: 'help',
    textDecoration: 'underline',
    textDecorationStyle: 'dotted',
  },
}));
