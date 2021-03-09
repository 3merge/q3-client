import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  menuItem: {
    alignItems: 'center',
    display: 'flex',
    marginRight: theme.spacing(1),
    padding: theme.spacing(0.5),
    textDecoration: 'none !important',
    color: 'inherit',

    '& svg': {
      marginRight: theme.spacing(0.5),
    },
  },
  anchor: {
    cursor: 'initial',
  },
  active: {
    color: theme.palette.secondary.dark,
    fontWeight: 'bold',
  },
  parent: {
    color: theme.palette.secondary.dark,
  },
}));
