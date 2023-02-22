import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    flexWrap: 'nowrap',
    overflow: 'auto',
    '& *:focus': {
      background: `${theme.palette.background.default} !important`,
    },
  },
  nestedGroup: {
    '& > div:first-of-type': {
      '& button': {
        borderTopLeftRadius: '50% !important',
        borderBottomLeftRadius: '50% !important',
      },
    },
    '& > div:last-of-type': {
      '&  button': {
        borderTopRightRadius: '50% !important',
        borderBottomRightRadius: '50% !important',
      },
    },
  },
}));
