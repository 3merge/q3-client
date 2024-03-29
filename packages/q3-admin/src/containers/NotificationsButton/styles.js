import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  shake: {
    '& svg': {
      animation:
        '$bellshake .5s cubic-bezier(.36,.07,.19,.97) both',
    },
  },
  '@keyframes bellshake': {
    '0%': { transform: 'rotate(0)' },
    '15%': { transform: 'rotate(5deg)' },
    '30%': { transform: 'rotate(-5deg)' },
    '45%': { transform: 'rotate(4deg)' },
    '60%': { transform: 'rotate(-4deg)' },
    '75%': { transform: 'rotate(2deg)' },
    '85%': { transform: 'rotate(-2deg)' },
    '92%': { transform: 'rotate(1deg)' },
    '100%': { transform: 'rotate(0)' },
  },
}));
