import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    margin: `0 0 ${theme.spacing(1)}`,
    padding: 0,

    [theme.breakpoints.down('md')]: {
      margin: `${theme.spacing(2)} -24px`,
    },
  },
}));
