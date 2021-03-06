import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  view: {
    backgroundColor: ({ hasAside }) =>
      hasAside
        ? theme.palette.background.paper
        : theme.palette.background.default,
    position: 'relative',
    margin: '0 auto',
    maxWidth: '100%',
    width: ({ hasAside }) => (hasAside ? '100%' : 1440),
    zIndex: 1,

    '& > div': {
      backgroundColor: ({ hasAside }) =>
        hasAside
          ? theme.palette.background.paper
          : theme.palette.background.default,
    },

    [theme.breakpoints.down('sm')]: {
      border: 'none',
    },
  },
  articleWrapper: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  section: {
    backgroundColor: ({ hasAside }) =>
      hasAside
        ? theme.palette.background.paper
        : theme.palette.background.default,
  },
}));
