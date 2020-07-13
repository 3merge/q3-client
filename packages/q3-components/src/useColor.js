import {
  red,
  green,
  orange,
} from '@material-ui/core/colors';
import { useTheme } from '@material-ui/core/styles';

export default (color = 'primary', hue = 500) => {
  const theme = useTheme();

  if (typeof color === 'string' && color.startsWith('#'))
    return color;

  if (
    ['primary', 'secondary'].includes(color) &&
    hue === 900
  )
    return '#FFF';

  switch (color) {
    case 'primary':
      return theme.palette.primary.main;
    case 'secondary':
      return theme.palette.primary.main;
    case 'danger':
      return red[hue];
    case 'warning':
      return orange[hue];
    case 'success':
      return green[hue];
    default:
      return color;
  }
};
