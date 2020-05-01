import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    fontWeight: 400,
    maxWidth: 350,
    textOverflow: 'ellipsis',
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: '1.21rem',
    margin: '0 0 0 .5rem',
  },
}));
