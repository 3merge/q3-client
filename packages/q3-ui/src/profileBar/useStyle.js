import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  trigger: {
    position: 'absolute',
    bottom: '5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 100,

    [theme.breakpoints.down('md')]: {
      backgroundColor: 'transparent',
      color: '#FFF',
      position: 'relative',
      left: 'auto',
      bottom: 'auto',
      margin: theme.spacing(1),
      transform: 'none',
    },
  },
  center: {
    color: '#FFF',
    backgroundColor: 'transparent',
    left: '50%',
    transform: 'translateX(-50%)',
  },

  shell: {
    width: 92,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },

  colourful: ({ isOpen }) => ({
    backgroundColor: theme.palette.primary.main,
    boxSizing: 'border-box',
    color: '#FFF',
    display: 'flex',
    height: '100vh',
    position: 'fixed',
    width: 92,
    zIndex: 100,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(1),

    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
      flexDirection: 'row',
      padding: 0,
      position: 'relative',
      height: 'auto',
      width: '100%',

      '&>div': {
        width: 'auto',
      },
    },
  }),

  mobileColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
}));
