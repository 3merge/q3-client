import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  h1: {
    '& > span > span': {
      padding: 0,
      fontSize: 'inherit',
      lineHeight: 'inherit',
    },
    '& > span > span > span': {
      '& svg': {
        fontSize: '0.833rem',
      },
    },
  },
}));
