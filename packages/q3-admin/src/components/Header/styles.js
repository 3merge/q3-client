import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingLeft: 0,
    paddingRight: 0,
    position: 'relative',

    [theme.breakpoints.down('md')]: {
      '& h1': {
        paddingLeft: theme.spacing(1),
        textAlign: 'left',
        width: '100%',
      },
    },
  },
}));
