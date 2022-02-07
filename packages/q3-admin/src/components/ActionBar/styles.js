import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    diplay: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      position: 'fixed',
      top: 0,
      right: theme.spacing(1),
      height: 65,
      justifyContent: 'center',
      zIndex: 10000,

      '& *': {
        color: theme.palette.primary.contrastText,
      },
    },
  },
}));
