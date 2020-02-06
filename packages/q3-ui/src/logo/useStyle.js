import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  logo: {
    fill: '#FFF',
    width: 64,
    height: 64,
    position: 'relative',
    '&>svg': {
      width: '100%',
      height: '100%',
      transform: 'scale(1.5)',
    },
  },
  logoText: {
    color: '#FFF',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3em',
    },
  },
  showOnHover: {
    '& #logo-text': {
      opacity: 0,
      transitionProperty: 'opacity, transform',
      transitionDuration: '250ms',
      transform: 'translateX(-10px)',
    },
    '&:hover #logo-text': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
}));
