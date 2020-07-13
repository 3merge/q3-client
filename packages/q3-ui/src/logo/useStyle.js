import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  logo: {
    fill: '#FFF',
    height: 65,
    display: 'inline-block',
    fontSize: '100%',
    textDecoration: 'none',
    width: 75,

    '& svg': {
      height: '100%',
      width: '100%',
      transform: 'scale(1.25)',
    },

    [theme.breakpoints.down('md')]: {
      width: 65,
    },
  },
}));
