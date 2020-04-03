import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  notice: {
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    color: '#FFF',
    display: 'flex',
    justifyContent: 'center',
  },
  noMargin: {
    margin: '0 !important',
  },
}));
