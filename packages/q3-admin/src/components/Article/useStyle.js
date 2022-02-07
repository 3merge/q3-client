import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  view: {
    margin: '0 auto',
    maxWidth: '100%',
    width: '100%',
    zIndex: 1,
  },
  articleWrapper: {
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  section: {
    [theme.breakpoints.down('md')]: {
      '& > div': {
        height: 'calc((100 * var(--vh)) - 65px)',
      },
    },
  },
}));
