import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    boxShadow: theme.shadows[1],
    position: 'relative',
    zIndex: 1,
    height: 75,
    padding: `${theme.spacing(0.25)} ${theme.spacing(2)}`,
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      display: 'flex',
      justifyContent: 'center',
      bottom: 0,
      position: 'fixed',
      left: 0,
      right: 0,

      padding: theme.spacing(1),

      '& > div': {
        justifyContent: 'center',
        width: 'auto',
        flex: 0,
      },
    },
  },
}));
