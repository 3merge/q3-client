import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  grid: {
    flexDirection: 'row-reverse',
  },
  aside: {
    maxWidth: 320,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));
