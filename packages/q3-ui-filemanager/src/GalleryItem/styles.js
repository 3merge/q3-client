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
    },
  },
  content: {
    overflow: 'hidden',

    '& span': {
      fontSize: theme.typography.body1.fontSize,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  root: {},
}));
