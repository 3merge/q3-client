import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  list: {
    listStyle: 'none',
    margin: `${theme.spacing(0.25)} 0`,
    maxWidth: '40vw',
    padding: 0,

    [theme.breakpoints.down('md')]: {
      margin: `${theme.spacing(1)} auto ${theme.spacing(
        0.5,
      )}}`,
      maxWidth: '75vw',
    },

    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  listItem: {
    display: 'inline-block',
    fontSize: 'small',
    marginRight: theme.spacing(1.5),
    cursor: 'help',
  },
  listItemText: {
    alignItem: 'center',
    display: 'flex',

    '& svg': {
      marginRight: 4,
      height: '1rem',
    },
  },
}));
