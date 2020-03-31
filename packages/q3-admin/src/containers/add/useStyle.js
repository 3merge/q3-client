/* eslint-disable no-param-reassign */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },

  floatOnDesktop: {
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    width: 75,
    height: 75,
    boxShadow: theme.shadows[20],
    zIndex: 1000,
  },
}));
