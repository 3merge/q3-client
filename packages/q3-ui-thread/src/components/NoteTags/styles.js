import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.main,
    paddingLeft: 16,
    paddingRight: 16,
    overflow: 'auto',

    '&:empty': {
      display: 'none',
    },

    '& > div': {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.secondary.main,
    },
  },
}));
