import { makeStyles } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';

export const getColor = (letter) => {
  let backgroundColor;
  let color;

  switch (letter) {
    case 'A':
    case 'Q':
      backgroundColor = colors.red['50'];
      color = colors.red['900'];
      break;
    case 'B':
    case 'R':
      backgroundColor = colors.pink['50'];
      color = colors.red['900'];
      break;
    case 'C':
    case 'S':
      backgroundColor = colors.purple['50'];
      color = colors.purple['900'];
      break;
    case 'D':
    case 'T':
      backgroundColor = colors.deepPurple['50'];
      color = colors.deepPurple['900'];
      break;
    case 'E':
    case 'U':
      backgroundColor = colors.indigo['50'];
      color = colors.indigo['900'];
      break;
    case 'F':
    case 'V':
      backgroundColor = colors.blue['50'];
      color = colors.blue['900'];
      break;
    case 'G':
    case 'W':
      backgroundColor = colors.lightBlue['50'];
      color = colors.lightBlue['900'];
      break;
    case 'H':
    case 'X':
      backgroundColor = colors.cyan['50'];
      color = colors.cyan['900'];
      break;
    case 'I':
    case 'Y':
      backgroundColor = colors.teal['50'];
      color = colors.teal['900'];
      break;
    case 'J':
    case 'Z':
      backgroundColor = colors.green['50'];
      color = colors.green['900'];
      break;
    case 'k':
    case 'l':
      backgroundColor = colors.lightGreen['50'];
      color = colors.lightGreen['900'];
      break;
    case 'm':
    case 'n':
      backgroundColor = colors.orange['50'];
      color = colors.orange['900'];
      break;
    case 'o':
    case 'p':
      backgroundColor = colors.amber['50'];
      color = colors.amber['900'];
      break;
    default:
      backgroundColor = colors.deepOrange['50'];
      color = colors.deepOrange['900'];
      break;
  }

  return {
    backgroundColor,
    color,
  };
};

export default makeStyles((theme) => ({
  badge: ({ color }) => ({
    color,
    transitionDuration: '225ms',
    transitionProperty: 'margin,transform',
    transformOrigin: 'center',

    '&:hover,&:focus': {
      transform: 'scale(1.15)',
      zIndex: 1,
    },

    '& > .MuiBadge-badge': {
      boxShadow: theme.shadows[10],
      right: 4,
      top: 3,
    },
  }),
  root: ({ backgroundColor, color, large, onClick }) => ({
    border: '1px solid #fff',

    backgroundColor,
    color,
    ...(onClick ? { cursor: 'pointer' } : {}),
    ...(large
      ? {
          fontSize: '1.5rem',
          height: 55,
          width: 55,
        }
      : {}),
  }),
}));
