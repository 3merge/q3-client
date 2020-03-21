import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  sticky: {
    position: 'sticky',
    top: 0,
  },
  trigger: {
    position: 'absolute',
    top: '6rem',
    left: 'calc(100% - 1rem)',
  },
  colourful: ({ isOpen }) => ({
    backgroundColor: theme.palette.primary.main,
    boxShadow: isOpen
      ? theme.shadows[25]
      : theme.shadows[5],
    boxSizing: 'border-box',
    color: '#FFF',
    height: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingTop: theme.spacing(2),
    position: 'absolute',
    transition: 'all 350ms',
    '& *': {
      color: '#FFF',
      fontSize: '1.11rem',
    },
  }),
  mobile: {
    backgroundColor: theme.palette.primary.main,
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    width: 185,
  },
}));
