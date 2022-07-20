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
    whiteSpace: 'nowrap',

    '& span': {
      fontSize: theme.typography.body1.fontSize,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  root: {},
}));
