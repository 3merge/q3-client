import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    fontSize: '.833rem',

    '& ol': {
      lineHeight: '1rem !important',
    },
  },
  font: {
    fontSize: '.833rem',
  },
}));
