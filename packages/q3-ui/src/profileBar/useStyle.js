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
    // color: '#FFF',
    backgroundColor: 'transparent',
    left: '50%',
    transform: 'translateX(-50%)',
  },

  shell: {
    width: 75,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },

  colourful: ({ isOpen }) => ({
    display: 'flex',
    height: '100vh',
    width: 75,
    zIndex: 100,
    paddingTop: '2rem',
    paddingBottom: '2rem',
    borderRight: '3px solid white',
  }),

  mobileColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
}));
