import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  list: {
    listStyle: 'none',
    margin: `${theme.spacing(1)} 0`,
    maxWidth: '40vw',
    padding: 0,

    [theme.breakpoints.down('md')]: {
      maxWidth: '100% !important',
    },
  },
  listItem: {
    display: 'inline',
    fontSize: '0.911rem',
    marginRight: theme.spacing(1.5),

    '& svg': {
      height: '100%',
      verticalAlign: 'middle',
    },
  },
}));
