import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  badge: {
    '& > span:last-of-type': {
      left: '-1rem',
      top: '-.5rem',
    },
  },
}));
