import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  button:
    theme.palette.type === 'dark'
      ? {
          backgroundColor: red[100],
          color: red[900],
          '&:hover': {
            backgroundColor: red[200],
          },
        }
      : {
          backgroundColor: red[800],
          '&:hover': {
            backgroundColor: red[900],
          },
        },
}));
