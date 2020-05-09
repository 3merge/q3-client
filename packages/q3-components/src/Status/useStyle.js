import {
  red,
  green,
  orange,
} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const getColor = (color, theme, hue = 100) => {
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

const getBackgroundColorProps = (color, theme) => {
  const style = {};
  if (color) {
    style.backgroundColor = getColor(color, theme, 50);
    style.color =
      !['primary', 'secondary'].includes(color) &&
      !color.startsWith('#')
        ? getColor(color, theme, 900)
        : '#FFF';
  }

  return style;
};

const getColorProps = (color, theme) => {
  const style = {};
  if (color) {
    style.color = getColor(color, theme, 900);
    style.backgroundColor = '#FFF';
  }

  return style;
};

export default makeStyles((theme) => ({
  root: () => ({
    backgroundColor: '#FFF !important',
    boxShadow: theme.shadows[2],
    transform: 'scale(1.5)',
    marginRight: '0 !important',
    display: 'inline-block',
  }),
  chip: ({ color }) => ({
    boxShadow: theme.shadows[1],
    ...getBackgroundColorProps(color, theme),
  }),
  icon: ({ color }) => ({
    ...getColorProps(color, theme),
    transform: 'scale(0.5)',
  }),
}));
