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
      backgroundColor: theme.palette.background.paper,
      boxShadow: 'rgb(0 0 0 / 8%) 0px -3px 18px 3px',

      // '& .Mui-disabled': {
      //   color: theme.palette.secondary.contrastText,
      //   opacity: 0.5,
      // },
    },
  },
}));
