import { makeStyles } from '@material-ui/core/styles';
import { green, orange } from '@material-ui/core/colors';

export const isIdle = (next) => ({
  hasChange,
  hasPendingUpdate,
}) => next(hasChange || hasPendingUpdate ? orange : green);

export default makeStyles((theme) => ({
  dot: isIdle((color) => ({
    backgroundColor: color[200],
    borderRadius: 500,
    color: color[900],
    fontSize: '1.211rem',
    marginRight: theme.spacing(0.5),
    padding: theme.spacing(0.25),
  })),
  label: isIdle((color) => ({
    color: color[900],
    fontSize: '0.812rem',
    fontWeight: 'strong',
  })),
  root: {
    overflow: 'visible',
    marginTop: '1rem',
    width: 175,

    '& small': {
      fontSize: '0.812rem',
    },

    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: -20,
      left: '50%',
      borderBottom: '10px solid #FFF',
      borderRight: '10px solid transparent',
      borderLeft: '10px solid transparent',
      borderTop: '10px solid transparent',
      transform: 'translateX(-50%)',
      zIndex: 10,
    },
  },
}));
