import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  badge: {
    '& > span:last-of-type': {
      left: '.25rem',
      top: '.25rem',
      width: 4,
    },
  },
}));
