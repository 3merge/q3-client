import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  menuItem: {
    alignItems: 'center',
    display: 'flex',
    padding: theme.spacing(0.5),
    textDecoration: 'none !important',
    color: 'inherit',

    '& svg': {
      marginRight: theme.spacing(0.75),
    },
  },
}));
