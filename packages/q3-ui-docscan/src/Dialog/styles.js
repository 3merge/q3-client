import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  fab: {
    left: theme.spacing(1),
    position: 'fixed',
    top: theme.spacing(1),
    zIndex: 10,
  },
}));
