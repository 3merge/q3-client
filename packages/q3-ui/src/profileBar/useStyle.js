import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  trigger: {
    position: 'absolute',
    top: '6rem',
    left: 'calc(100% - 1rem)',
    zIndex: 100,

    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'transparent',
      color: '#FFF',
      position: 'relative',
      left: 'auto',
      top: 'auto',
      margin: theme.spacing(1),
    },
  },

  shell: {
    width: 105,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  colourful: ({ isOpen }) => ({
    backgroundColor: theme.palette.primary.main,
    boxShadow: isOpen
      ? theme.shadows[25]
      : theme.shadows[5],
    boxSizing: 'border-box',
    color: '#FFF',
    display: 'flex',
    height: '100vh',
    position: 'fixed',
    width: 105,
    zIndex: 100,
    flexDirection: 'column',
    justifyContent: 'space-between',

    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      flexDirection: 'row',
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
