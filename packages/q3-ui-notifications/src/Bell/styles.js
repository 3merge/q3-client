import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  avatar: () => ({
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
  }),
  number: {
    backgroundColor: theme.palette.secondary.main,
    fontSize: 'small',
    padding: '.25rem',
    borderRadius: 500,
    width: 48,
    height: 48,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
}));
