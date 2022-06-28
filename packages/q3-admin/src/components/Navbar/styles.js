import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  nav: {
    backgroundColor: theme.palette.background.paper,
    height: 'calc(100 * var(--vh))',
    position: 'relative',
    width: 290,
    zIndex: 10,

    '& > div > a': {
      maxHeight: 80,
      marginBottom: theme.spacing(3),
    },
  },
  appbar: {
    boxShadow: theme.shadows[1],
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: 65,
    padding: `0 ${theme.spacing(1)}`,
    width: '100%',
    zIndex: 1,
  },
  paper: {
    borderRadius: 0,
    overflowX: 'auto',
    padding: theme.spacing(1.5),
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.background.muted
        : theme.palette.background.paper,
  },
  buttonLink: {
    '&.active': {
      color: theme.palette.secondary.main,
    },
  },
  fab: {
    boxShadow: 'none',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    padding: '0 8px',
    width: '100%',

    '& span, & svg': {
      fontSize: theme.typography.body1.fontSize,
    },
  },
  fabText: {
    fontSize: theme.typography.body1.fontSize,
    textTransform: 'none',
  },
}));
