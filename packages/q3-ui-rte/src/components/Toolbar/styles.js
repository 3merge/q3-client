import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    flexWrap: 'nowrap',
    overflow: 'auto',
    '& *:focus': {
      background: `${theme.palette.background.default} !important`,
    },
  },
}));
