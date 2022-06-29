import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  group: {
    position: 'absolute',
    right: '3vw',
  },
  button: {
    border: `1px solid ${theme.palette.background.muted}`,
    color: 'inherit',

    '&[data-on="true"]': {
      color: theme.palette.secondary.main,
    },
  },
}));
