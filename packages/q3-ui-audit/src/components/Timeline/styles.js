import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  content: {
    flex: 0,
  },
  entry: {
    minHeight: 0,
    paddingBottom: 0,

    '&::before': {
      flex: 'none !important',
      padding: 0,
    },
  },
}));
