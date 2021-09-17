import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    flexDirection: 'row-reverse',
    margin: 0,
    padding: '.66rem',
    height: '3rem !important',
    minHeight: '3rem !important',
  },
  content: {
    padding: 0,
  },
  root: {
    boxShadow: 'none',
    margin: '0 !important',
    marginBottom: `${theme.spacing(1)} !important`,
    backgroundColor: theme.palette.background.default,
    borderRadius: 8,
    padding: '0 .5rem',
  },
  text: {
    maxHeight: '3rem',
    marginLeft: '1rem',
    // display: 'inline-block',
    lineHeight: 1.3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
  },
  pagination: {
    textAlign: 'right',
    width: 'auto',
  },
}));
