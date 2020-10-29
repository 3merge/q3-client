import { makeStyles } from '@material-ui/core/styles';

export const REGULAR = 'regular';
export const LARGE = 'large';
export const SMALL = 'small';
export const STACKED = 'stacked';
export const SPREAD = 'spread';

const withoutOuterSpin = {
  '&::-webkit-inner-spin-button,&::-webkit-outer-spin-button': {
    appearance: 'none',
    margin: 0,
  },
};

const getHeight = (v = 1) => v * 9;
const getPadding = (v = 1) => `0 ${6 * v}px`;
const getFontSize = (v = 1) => `${0.87 * v}rem`;

const makeInputStyle = ({ size, variant }) => {
  let attrs = {
    height: getHeight(2),
    fontSize: '1rem',
    '& > div': {
      padding: getPadding(2),
    },
  };

  if (size === SMALL) {
    attrs = {
      fontSize: '0.877rem',
      height: getHeight(1),
      ...withoutOuterSpin,
      '& > div': {
        padding: getPadding(1),
      },
    };
  } else if (size === LARGE) {
    attrs = {
      height: getHeight(3),
      fontSize: '1.5rem',

      '& > div': {
        padding: getPadding(3),
      },
    };
  }

  return {
    textAlign: variant === 'spread' ? 'center' : 'left',
    ...attrs,
    ...withoutOuterSpin,
  };
};

const makeTextFieldStyle = (theme) => ({ size }) => {
  let width = 275;

  if (size === SMALL) {
    width = 155;
  } else if (size === LARGE) {
    width = 650;
  }

  return {
    margin: 0,
    maxWidth: '100%',
    width,
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
  };
};

const makeIconStyle = ({ size }) => {
  let fontSize = getFontSize(1.22);
  if (size === SMALL) {
    fontSize = getFontSize(1);
  } else if (size === LARGE) {
    fontSize = getFontSize(1.5);
  }

  return {
    display: 'inline-block',
    padding: 0,
    fontSize,

    '& svg': {
      fontSize: '1em',
    },
  };
};

export default makeStyles((theme) => ({
  bottom: makeIconStyle,
  input: makeInputStyle,
  top: makeIconStyle,
  text: makeTextFieldStyle(theme),

  float: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    padding: 0,
  },

  grow: {
    flex: 1,
  },
}));
