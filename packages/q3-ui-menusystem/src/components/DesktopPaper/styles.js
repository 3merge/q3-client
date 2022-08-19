import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  contents: {
    [theme.breakpoints.down('md')]: {
      margin: '-1.5rem',
    },
  },
  nav: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    transition: 'width 350ms ease-in',
    width: 'min-content',
    zIndex: 10,

    '& > div > a': {
      maxHeight: 80,
      marginBottom: theme.spacing(3),
    },
  },
  paper: {
    borderRadius: 0,

    padding: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
  },
}));
