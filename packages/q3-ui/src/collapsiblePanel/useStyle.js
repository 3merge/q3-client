import {
  orange,
  green,
  red,
} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export const getColorByIndex = (bool) => (index) =>
  bool ? green[index] : orange[index];

export const makeBorderColorProperty = (color) => ({
  borderTop: `2px solid ${color[100]}`,
  background: color[50],
});

export const makeColorProperty = (color) => ({
  color: color[900],
});

export default makeStyles((theme) => ({
  root: ({ important }) => {
    const fn = getColorByIndex(important);
    return {
      backgroundColor: fn(50),
      border: '1px solid #FFF',
      color: fn(900),
      fontSize: '0.9rem',
    };
  },

  border: ({ error, success, warning }) => {
    if (error) return makeBorderColorProperty(red);
    if (success) return makeBorderColorProperty(green);
    if (warning) return makeBorderColorProperty(orange);
    return {};
  },

  iconFont: ({ error, warning }) => {
    if (error) return makeColorProperty(red);
    if (warning) return makeColorProperty(orange);
    return {};
  },

  icon: ({ important }) => {
    const fn = getColorByIndex(important);
    return {
      color: fn(900),
      fontSize: 15,
      marginRight: '0.5rem',
    };
  },

  backdrop: ({ transparent }) =>
    transparent
      ? {
          backgroundColor: '#FFF',
          padding: theme.spacing(2),
          width: '100%',
        }
      : {
          backgroundColor: '#EEE',
          padding: 0,
          width: '100%',
        },

  padding: {
    padding: theme.spacing(1),
  },
}));
