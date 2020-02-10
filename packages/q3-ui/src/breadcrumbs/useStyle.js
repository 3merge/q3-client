import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  capitalize: {
    textTransform: 'capitalize',
    maxWidth: 120,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 12,
    whiteSpace: 'nowrap',
    lineHeight: 2,
  },
  contrast: {
    color: '#FFF',
    '& *': {
      color: '#FFF',
    },
    '& svg': {
      backgroundColor: 'rgba(255,255,255,0.2)',
    },
  },
}));
