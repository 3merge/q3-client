import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    padding: '0 0 0 8px',
    boxSizing: 'border-box',
    position: 'relative',

    '& ul': {
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },

    '&::before': {
      display: 'block',
      position: 'absolute',
      content: '""',
      top: 0,
      backgroundColor: theme.palette.background.muted,
      left: 0,
      width: 1,
      height: '100%',
    },
  },
}));
