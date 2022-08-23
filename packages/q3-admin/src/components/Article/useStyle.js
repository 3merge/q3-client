import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  view: {
    margin: '0 auto',
    maxWidth: '100%',
    width: '100%',
    zIndex: 1,

    '& > div': {
      background: theme.palette.background.default,
      padding: '0 2rem',

      [theme.breakpoints.down('md')]: {
        padding: '0 .75rem .75rem',
      },
    },
  },
  articleWrapper: {
    position: 'relative',

    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  section: {
    background: theme.palette.background.default,
  },
}));
