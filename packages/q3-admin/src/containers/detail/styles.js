import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  grid: {
    '& > div': {
      '&:first-child': {
        marginBottom: theme.spacing(0.5),
      },
    },

    [theme.breakpoints.up('md')]: {
      '& > div:first-child': {
        marginRight: theme.spacing(0.5),
      },
    },
    [theme.breakpoints.down('md')]: {
      margin: '0 !important',
      width: '100%',

      '& > div': {
        width: '100%',

        '&:first-child': {
          marginRight: 0,
        },
      },
    },
  },
  details: {
    minWidth: 400,
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
    },
  },
}));
