import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  root: {
    '& figure > div:last-of-type > div': {
      height: 300,
    },
  },
}));
