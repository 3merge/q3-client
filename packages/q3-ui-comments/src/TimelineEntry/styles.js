import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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
  wrap: ({ connector }) => ({
    margin: connector
      ? '-.25rem 0 0 !important'
      : '.75rem 0  !important',

    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  }),
  title: {
    margin: '0 !important',
    position: 'relative',

    '& > *': {
      marginRight: '.75rem',

      [theme.breakpoints.down('sm')]: {
        display: 'block',
        marginRight: 0,

        '&:not(:last-child)': {
          paddingRight: 32,
        },

        '&:last-child': {
          position: 'absolute',
          top: 0,
          right: 0,
        },
      },
    },
  },
  rich: {
    fontSize: '0.9rem',
    '& > *': {
      margin: '.75rem 0 !important',
    },
    '& img': {
      maxWidth: 550,

      [theme.breakpoints.down('md')]: {
        maxWidth: '100%',
      },
    },
  },
}));
