import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette: { primary } }) => ({
  button: {
    position: 'absolute',
    right: '1rem',
    top: '1.25rem',
    transform: ({ isOpen }) =>
      isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
    color: 'inherit',
  },
  container: {
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  wrap: {
    height: '100%',
    minWidth: 270,
    opacity: ({ isOpen }) => (isOpen ? 1 : 0),
    transition: 'opacity 250ms',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  root: {
    backgroundColor: primary.dark,
    color: primary.contrastText,
    display: 'inline-block',
    height: '100vh',
    position: 'relative',
    transition: 'width 230ms ease-in',
    width: ({ isOpen }) => (isOpen ? 270 : '4rem'),
  },
}));
