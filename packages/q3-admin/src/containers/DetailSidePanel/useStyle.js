import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    fontSize: '1rem !important',
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'relative',
    marginBottom: theme.spacing(2),
  },
  item: {
    minWidth: 'auto',
    maxWidth: 'none',
    paddingLeft: 0,
    paddingRight: 0,
    '& svg': {
      fontSize: '1.232rem',
    },
  },
}));
