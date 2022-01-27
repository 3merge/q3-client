import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    position: 'fixed',
    bottom: 0,
    height: 65,
    left: 0,
    right: 0,
    paddingRight: theme.spacing(1),
    whiteSpace: 'nowrap',
    zIndex: 1,

    '&:empty': {
      display: 'none',
    },

    '& > div': {
      justifyContent: 'center',
    },
  },
}));
