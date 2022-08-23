import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    // boxShadow: theme.shadows[],
    position: 'relative',
    zIndex: 1,
    height: 75,
    padding: `${theme.spacing(0.25)} ${theme.spacing(2)}`,
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.down('md')]: {
      borderTop: `1px solid ${theme.palette.background.default}`,
      display: 'flex',
      justifyContent: 'space-evenly',
      bottom: 0,
      position: 'fixed',
      left: 0,
      right: 0,
      padding: 0,
      boxShadow: 'none',

      '& [aria-current="page"], & [data-state="active"]': {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
      },
    },
  },
  actions: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',

    [theme.breakpoints.down('md')]: {
      flex: 0,
      '& > div': {
        textAlign: 'center',
      },
      '& > div:nth-child(2)': {
        textAlign: 'right',
        width: '18vw',
      },
      '&:empty': {
        display: 'none',
      },
    },
  },
}));
