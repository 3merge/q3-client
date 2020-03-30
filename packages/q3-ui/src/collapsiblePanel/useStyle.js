import {
  orange,
  green,
  red,
  indigo,
} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export const getColor = ({
  error,
  success,
  warning,
  informational,
}) => {
  if (error) return red;
  if (success) return green;
  if (warning) return orange;
  if (informational) return indigo;
  return undefined;
};

export const getColorByIndex = (bool) => (index) =>
  bool ? green[index] : orange[index];

export const makeBorderColorProperty = (color) => ({
  borderLeft: color
    ? `2px solid ${color[900]}`
    : '2px solid',
  borderRadius: 'none !important',
});

export const makeColorProperty = (color) => ({
  color: color ? color[900] : 'inherit',
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

  border: (props) => ({
    ...makeBorderColorProperty(getColor(props)),
    background: props.muted
      ? 'whitesmoke !important'
      : '#FFF  !important',
    boxSizing: 'border-box',
    '&.Mui-expanded': {
      backgroundColor: props.muted
        ? '#FFF  !important'
        : 'whitesmoke  !important',
      transition: 'background-color 500ms',
    },
  }),

  iconFont: (props) => ({
    ...makeColorProperty(getColor(props)),
    margin: 0.5,
  }),

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
