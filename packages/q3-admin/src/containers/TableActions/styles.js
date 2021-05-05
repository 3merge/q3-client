import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent !important',
    right: 0,
    padding: `0 ${theme.spacing(2)}`,

    [theme.breakpoints.down('sm')]: {
      right: '3.75rem',
      padding: 0,
    },
  },
}));
