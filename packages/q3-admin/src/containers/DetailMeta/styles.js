import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  primary: {
    fontSize: '0.812rem',
    fontWeight: 'bold',
  },
  secondary: {
    fontSize: '0.812rem',
  },
  meta: {
    '& li > div': {
      padding: 0,

      [theme.breakpoints.down('md')]: {
        paddingLeft: theme.spacing(0.5),
      },
    },
  },
  listItem: {},
}));
