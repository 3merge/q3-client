import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  stepper: {
    whiteSpace: 'nowrap',
    paddingTop: 0,
  },
  button: {
    '&[data-completed="true"] svg': {
      color: theme.palette.secondary.main,
    },
    [theme.breakpoints.down('md')]: {
      '& *': {
        fontSize: '0.875rem',
      },
    },
  },
  content: {
    whiteSpace: 'break-spaces',
  },
}));
