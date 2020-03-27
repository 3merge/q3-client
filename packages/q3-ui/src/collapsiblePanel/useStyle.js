import {
  orange,
  green,
  red,
} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export const getColorByIndex = (bool) => (index) =>
  bool ? green[index] : orange[index];

export const makeBorderColorProperty = (color) => ({
  borderLeft: `2px solid ${color[900]}`,
  borderRadius: 2,
});

export const makeColorProperty = (color) => ({
  color: color[900],
});

export default makeStyles((theme) => ({
  root: ({ important }) => {
    const fn = getColorByIndex(important);
    return {
      backgroundColor: fn(50),
      color: fn(900),
      fontSize: '0.9rem',
      marginBottom: 2,
    };
  },

  border: ({ error, success, warning }) => {
    let borderProps = {
      borderLeft: '2px solid transparent',
    };

    if (error) borderProps = makeBorderColorProperty(red);

    if (success)
      borderProps = makeBorderColorProperty(green);

    if (warning)
      borderProps = makeBorderColorProperty(orange);

    return {
      ...borderProps,
      boxSizing: 'border-box',
      '&.Mui-expanded': {
        backgroundColor: 'whitesmoke',
        transition: 'background-color 500ms',
      },
    };
  },

  iconFont: ({ error, warning, success }) => {
    if (success) return makeColorProperty(green);
    if (error) return makeColorProperty(red);
    if (warning) return makeColorProperty(orange);
    return {};
  },

  icon: ({ important }) => {
    const fn = getColorByIndex(important);
    return {
      color: fn(900),
      marginRight: '0.5rem',
      fontSize: 15,
    };
  },

  backdrop: ({ transparent }) =>
    transparent
      ? {
          backgroundColor: 'transparent',
          padding: 0,
          margin: '0 1rem',
          width: '100%',
        }
      : {
          backgroundColor: '#EEE',
          padding: theme.spacing(2),
          margin: '0 1rem',
          width: '100%',
        },

  padding: {
    padding: theme.spacing(0.25),
  },
}));
