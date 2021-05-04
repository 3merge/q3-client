import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    '&::before': {
      display: 'none',
    },
  },
  dot: {
    background: 'transparent',
    boxShadow: 'none',
    border: 0,
  },
  title: ({ connector }) => ({
    margin: connector ? '-.25rem 0 0' : '.75rem 0',
    '& *': {
      marginRight: '.75rem',
    },
  }),
  rich: {
    fontSize: '0.9rem',
  },
}));
