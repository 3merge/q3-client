import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  logo: {
    fill: '#FFF',
    textDecoration: 'none',
    display: 'block',
    transform: 'scale(1.15)',
    [theme.breakpoints.down('sm')]: {
      display: 'inline-block',
      transform: 'scale(2)',
      fontSize: '100%',
      height: '15px',
      width: '35px',
      marginLeft: '1rem',
    },
  },
}));
