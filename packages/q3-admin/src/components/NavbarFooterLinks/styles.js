import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    '& li': {
      margin: 0,
      padding: 0,
    },

    '& [aria-current="page"]': {
      color: theme.palette.secondary.main,
    },
  },
}));
