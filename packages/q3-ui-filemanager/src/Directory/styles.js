import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',

    '& > div': {
      alignItems: 'center',
      display: 'flex',
    },

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',

      '& > div:first-child': {
        justifyContent: 'space-between',
        paddingBottom: theme.spacing(1),
      },
    },
  },
  mobileActions: {
    justifyContent: 'flex-end',

    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
    },
  },
}));
