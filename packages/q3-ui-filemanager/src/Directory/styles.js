import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  toolbar: {
    display: 'flex',

    '& > div': {
      alignItems: 'center',
      display: 'flex',
      marginBottom: theme.spacing(1),
    },
  },
  mobileActions: {
    justifyContent: 'flex-end',

    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
    },
  },
}));
