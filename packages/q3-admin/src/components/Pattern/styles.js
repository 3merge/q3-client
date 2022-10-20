import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  paper: {
    background: theme.palette.background.paper,
    borderColor: theme.palette.background.muted,
    position: 'relative',
  },
  box: ({ height = 350 }) => ({
    maxHeight: height,
    overflow: 'overlay',
    zIndex: 1,
    position: 'relative',
  }),
  label: {
    color: theme.palette.secondary.main,
    textTransform: 'none',
  },
}));
