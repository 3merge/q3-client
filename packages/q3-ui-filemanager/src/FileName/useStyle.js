import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  link: {
    backgroundColor: 'transparent',
    border: 0,
    color: theme.palette.primary.dark,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '.812rem',
  },
  truncate: {
    textOverflow: 'ellipsis',
    position: 'relative',
    overflow: 'hidden',
  },
  root: {
    flexWrap: 'nowrap',
    maxWidth: '70%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  cover: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
}));
