import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  title: {
    alignItems: 'center',
    display: 'flex',

    '& svg': {
      marginRight: theme.spacing(1),
    },
  },
  card: ({ isHovering, isChecked }) => ({
    borderColor:
      isChecked || isHovering ? 'blue' : undefined,
    zIndex: 1,
    position: 'relative',
    '&:hover': {
      boxShadow: 'none',
      transform: 'none',
    },
  }),
}));
