import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  card: () => ({
    '&:hover': {
      boxShadow: 'none',
      transform: 'none',
    },
  }),
  avatar: {
    marginRight: theme.spacing(0.75),

    '& > *': {
      background: theme.palette.secondary.light,
      fontSize: theme.typography.body1.fontSize,
      width: theme.spacing(2),
      height: theme.spacing(2),
    },
  },
  content: {
    overflow: 'hidden',

    '& span': {
      fontSize: '0.812rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      lineClamp: 2,
      boxOrient: 'vertical',
      wordBreak: 'break-word',
      lineHeight: 1.2,
      hyphens: 'auto',
    },
  },
  root: {
    height: 56,
  },
}));
