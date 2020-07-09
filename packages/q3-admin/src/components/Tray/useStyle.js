import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    borderBottom: '2px solid #f4f6f8',
    borderLeft: '2px solid #f4f6f8',
    display: 'flex',
    paddingLeft: theme.spacing(1),
    paddingRight: 150,
    width: '100%',

    [theme.breakpoints.down('md')]: {
      left: 265,
      marginLeft: -15,
      paddingRight: theme.spacing(1),
      position: 'absolute',
      top: 0,
      width: 'calc(100% - 410px)',
    },

    [theme.breakpoints.down('sm')]: {
      left: 0,
      marginLeft: 0,
      justifyContent: 'space-between',
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(1),
      position: 'relative',
      width: '100%',
    },
  },
}));
