import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  root: {
    '& .q3-repeater-empty-graphic': {
      display: 'none',
    },
    '& .q3-repeater-tables:empty': {
      '& ~ .q3-repeater-empty-graphic': {
        display: 'block',
      },
    },
  },
}));
