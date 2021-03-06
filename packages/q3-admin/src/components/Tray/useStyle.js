import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    borderBottom: '2px solid #f4f4f5',
    borderLeft: '2px solid #f4f4f5',
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
      backgroundColor: '#f4f4f5',
      border: 0,
      left: 72,
      marginLeft: 0,
      justifyContent: 'space-between',
      paddingLeft: 0,
      paddingRight: 0,
      //  transform: 'translateX(-50%)',
      width: 'calc(100% - 148px)',
    },
  },
}));
