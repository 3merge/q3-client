import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    marginLeft: '-.5rem',
    marginTop: '.25rem',
  },
  listItem: {
    padding: '.125rem',
    width: 'auto',
  },
  chip: {
    border: 'none',
  },
}));
