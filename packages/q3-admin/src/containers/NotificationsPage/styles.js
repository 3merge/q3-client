import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    '& ul': {
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing(1.5),
    },
  },
}));
