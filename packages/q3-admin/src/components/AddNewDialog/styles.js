import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  button: {
    boxShadow: theme.shadows[2],
    transform: 'scale(1.5) translateY(-7%)',
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    margin: `0 ${theme.spacing(0.75)}`,
    position: 'relative',
    zIndex: 10,
  },
}));
