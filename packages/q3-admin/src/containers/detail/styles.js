import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  grid: {
    [theme.breakpoints.up('md')]: {},
    [theme.breakpoints.down('md')]: {
      margin: '0 !important',
      width: '100%',

      '& > div': {
        width: '100%',
      },
    },
  },
  details: {
    minWidth: 450,
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
    },
  },
}));
