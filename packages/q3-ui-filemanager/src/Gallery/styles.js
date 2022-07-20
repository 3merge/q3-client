import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  item: {
    maxWidth: 226,
    width: 300,

    [theme.breakpoints.down('sm')]: {
      maxWidth: '33%',
      width: '25%',
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '50%',
      width: '50%',
    },
  },
}));
