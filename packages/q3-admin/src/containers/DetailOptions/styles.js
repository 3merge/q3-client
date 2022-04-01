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

    [theme.breakpoints.down('sm')]: {
      paddingBottom: '0 !important',
      paddingTop: '0 !important',
    },
  },
  chip: {
    textDecoration: 'none !important',
    display: 'inline-flex',
    alignItems: 'center',
    color: 'inherit',
    cursor: 'pointer',
    '& svg': {
      marginRight: '.25rem',
    },
    '&[disabled]': {
      cursor: 'help',
    },
  },
}));
