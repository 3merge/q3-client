import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    marginLeft: '-.5rem',
    marginTop: '.25rem',
  },
  listItem: {
    width: 'auto',
  },
  chip: {
    borderRadius: 4,
    backgroundColor: theme.palette.secondary.muted,
    fontWeight: 'bold',
  },
}));
