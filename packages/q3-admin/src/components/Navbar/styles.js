import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  nav: ({ state }) => ({
    backgroundColor: theme.palette.background.paper,
    height: 'calc(var(--vh,100vh) - 75px)',
    position: 'relative',
    transition: 'width 250ms ease-in',
    zIndex: 10,
    width: state ? 225 : 0,

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }),

  paper: {
    borderRadius: 0,
    overflowX: 'auto',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.background.muted}`,
  },

  dialog: {
    maxWidth: '245px',

    '& > div > div': {
      padding: 0,
    },
  },
}));
