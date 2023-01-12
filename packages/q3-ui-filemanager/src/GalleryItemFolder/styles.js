import { makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  title: {
    alignItems: 'center',
    display: 'flex',
    fontSize: '0.812rem',
    wordBreak: 'break-all',

    '& span:last-of-type': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      fontSize: '0.812rem',
      display: '-webkit-box',
      lineClamp: 2,
      boxOrient: 'vertical',
      wordBreak: 'break-word',
      lineHeight: 1.2,
      hyphens: 'auto',
    },
  },
  card: ({ isHovering }) => {
    const out = {
      position: 'relative',
      zIndex: 1,
      height: 70,

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
  item: {},
}));
