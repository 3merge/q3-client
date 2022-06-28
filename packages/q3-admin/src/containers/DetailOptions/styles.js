import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  list: {
    listStyle: 'none',
    padding: 0,
    margin: `${theme.spacing(1)} 0 0 0`,
    minWidth: 280,

    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
    },
  },

  chip: {
    border: 'none',
    maxWidth: 250,
  },
}));
