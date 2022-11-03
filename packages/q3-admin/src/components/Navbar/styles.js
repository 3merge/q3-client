import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  nav: ({ state }) => ({
    backgroundColor: theme.palette.background.paper,
    height: 'var(--vh, 100vh)',
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
    padding: `${theme.spacing(1)} 0`,
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
