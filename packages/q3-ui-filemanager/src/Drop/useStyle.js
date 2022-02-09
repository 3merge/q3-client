import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    background: theme.palette.background.default,
    border: '1px solid transparent',
    borderRadius: 8,
    cursor: 'pointer',
    padding: '4vh',
    outline: 0,
    textAlign: 'center',
    transitionDuration: 500,
    transformProperty: 'background,border,color',
    position: 'relative',

    '&:hover': {
      background: theme.palette.secondary.light,
      border: `1px solid ${theme.palette.secondary.main}`,
      color: theme.palette.secondary.main,
    },

    '&:focus,&:focus-within': {
      background: theme.palette.secondary.light,
      border: `1px solid ${theme.palette.secondary.main}`,
      color: theme.palette.secondary.main,
    },
  },
  icon: {
    transform: 'rotate(45deg)',
  },
}));
