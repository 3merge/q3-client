import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  logo: {
    fill: '#FFF',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3em',
    },
  },
}));
