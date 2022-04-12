import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    diplay: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      left: 0,
      height: 65,
      justifyContent: 'center',
      zIndex: 1,
      overflowX: 'auto',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.contrastText,

      '& .Mui-disabled': {
        color: theme.palette.secondary.contrastText,
        opacity: 0.5,
      },
    },
  },
}));
