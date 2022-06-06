import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    display: 'inline-flex',
  },
  dot: ({ color }) => ({
    backgroundColor: color,
    borderRadius: 500,
    boxShadow: theme.shadows[1],
    display: 'inline-block',
    marginRight: '.25rem',
    height: '.5rem',
    width: '.5rem',
  }),
}));
