import { makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  title: {
    alignItems: 'center',
    display: 'flex',
    fontSize: theme.typography.body1.fontSize,
  },
  card: ({ isHovering }) => {
    const out = {
      position: 'relative',
      zIndex: 1,

      '&:hover': {
        boxShadow: 'none',
        transform: 'none',
      },
    };

    if (isHovering)
      return {
        ...out,
        borderColor: blue[200],
      };

    return out;
  },
  avatar: {
    background: theme.palette.secondary.light,
    marginRight: theme.spacing(0.75),
    fontSize: theme.typography.body1.fontSize,
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
}));