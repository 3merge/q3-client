import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  capitalize: {
    textTransform: 'capitalize',
    maxWidth: 120,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 12,
    whiteSpace: 'nowrap',
  },
}));
