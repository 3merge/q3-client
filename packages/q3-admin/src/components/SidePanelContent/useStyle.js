import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  bordered: {
    borderBottom: '2px solid #F5F7F9',
    //  marginBottom: '.25rem',
    borderRadius: 5,
    textOverflow: 'ellipsis',
    position: 'relative',
    padding: '.75rem',

    '&:last-of-type': {
      border: 0,
    },
    [theme.breakpoints.down('sm')]: {
      boxShadow: theme.shadows[0],
      backgroundColor: 'transparent',
    },
  },
  subtext: {
    fontSize: '1rem',
  },
}));
