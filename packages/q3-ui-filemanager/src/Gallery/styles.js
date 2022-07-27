import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  item: {
    maxWidth: '50%',
    width: 178,

    [theme.breakpoints.down('sm')]: {
      width: '25%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '50%',
    },
  },
}));
