import { makeStyles } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';

export default makeStyles((theme) => {
  const isDarkMode = theme.palette.type === 'dark';

  const getColor = (name) =>
    colors[name][isDarkMode ? 100 : 900];

  return {
    subheader: {
      fontWeight: 'bold',
      lineHeight: 1,
      color: isDarkMode
        ? theme.palette.primary.contrastText
        : theme.palette.primary.main,
    },
    small: {
      marginLeft: '.25rem',
    },
    box: ({ color }) => ({
      color: getColor(color),
    }),
    icon: ({ color }) => ({
      display: 'inline-flex',
      borderRadius: 500,
      position: 'relative',
      overflow: 'hidden',
      color: getColor(color),
    }),
    iconBg: ({ color }) => ({
      backgroundColor: getColor(color),
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      opacity: 0.15,
    }),
  };
});
