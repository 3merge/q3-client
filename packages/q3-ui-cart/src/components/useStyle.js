import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export const height = 64;

const baseButtonStyle = {
  display: 'block',
  position: 'absolute',
  padding: 2,
  right: 8,
};

const withoutOuterSpin = {
  '&::-webkit-inner-spin-button,&::-webkit-outer-spin-button': {
    appearance: 'none',
    margin: 0,
  },
};

export default makeStyles(() => ({
  input: {
    height: 28,
    fontSize: 22,
    ...withoutOuterSpin,
  },
  inputSmall: {
    fontSize: '0.877rem',
    width: 45,
  },
  inputSmallToggles: {
    fontSize: '0.877rem',
  },
  float: {
    backgroundColor: grey[200],
    borderLeft: `2px solid ${grey[300]}`,
    position: 'absolute',
    right: 0,
    width: 45,
    height,
  },
  top: {
    ...baseButtonStyle,
    top: 4,
  },
  bottom: {
    ...baseButtonStyle,
    bottom: 4,
  },
}));
