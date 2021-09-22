import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  label: {
    color: 'inherit',
    padding: '.25rem',
    fontSize: '0.833rem',
  },
  wrapper: {
    maxWidth: 280,
    maxHeight: '100%',
    overflow: 'auto',

    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
}));
