import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(1),
    fontSize: '.833rem',

    '& ol': {
      lineHeight: '1rem !important',
    },
  },
  font: {
    fontSize: '.833rem',
  },
}));
