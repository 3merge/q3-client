import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  card: ({ selected }) => ({
    '&:hover': {
      boxShadow: 'none',
      transform: 'none',
    },

    borderColor: selected ? 'blue' : undefined,
  }),
  action: {
    alignSelf: 'center',
    marginBottom: 0,
    marginRight: 4,
    marginTop: 0,
  },
  avatar: {
    marginRight: 0,

    '& > *': {
      background: 'transparent',
    },
  },
  content: {
    overflow: 'hidden',

    '& span': {
      // fontSize: '0.933rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  root: {
    padding: 8,
  },
}));
