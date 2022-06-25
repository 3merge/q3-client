import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  h1: {
    margin: 0,
    marginRight: '1rem',

    [theme.breakpoints.up('md')]: {
      maxWidth: 'calc(100% - 500px)',
    },
  },
}));
