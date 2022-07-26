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
      flexDirection: 'column-reverse',

      '& > div:first-child': {
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        paddingTop: theme.spacing(2),
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
