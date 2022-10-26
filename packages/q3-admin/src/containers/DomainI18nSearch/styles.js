import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  search: {
    width: '100%',

    '& div div': {
      backgroundColor: theme.palette.background.default,
    },
  },
}));
