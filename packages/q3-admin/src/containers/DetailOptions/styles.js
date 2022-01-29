import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  list: {
    listStyle: 'none',
    margin: `${theme.spacing(0.25)} 0`,
    maxWidth: '40vw',
    padding: 0,

    [theme.breakpoints.down('md')]: {
      maxWidth: '100% !important',
    },
  },
  listItem: {
    display: 'inline',
    fontSize: 'small',
    marginRight: theme.spacing(1.5),
    cursor: 'help',
  },
  listItemText: {
    alignItems: 'center',
    display: 'inline-flex',

    '& svg': {
      marginRight: 4,
      height: '1rem',
    },
  },
}));
