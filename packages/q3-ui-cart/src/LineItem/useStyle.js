import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  action: {
    marginTop: 10,
    textAlign: 'right',
    width: 155,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  avatar: {
    width: 95,
    height: 95,
    marginTop: 10,
    [theme.breakpoints.down('xs')]: {
      width: 85,
      height: 85,
    },
    [theme.breakpoints.down('xs')]: {
      width: 65,
      height: 65,
      margin: 0,
    },
  },
}));
