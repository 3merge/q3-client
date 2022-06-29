import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  view: {
    margin: '0 auto',
    maxWidth: '100%',
    width: '100%',
    zIndex: 1,

    '& > div': {
      background: theme.palette.background.default,
      padding: '0 3vw',
    },
  },
  articleWrapper: {
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  section: {},
}));
