import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export const height = 64;

const baseButtonStyle = {
  display: 'block',
  position: 'absolute',
  padding: 2,
  right: 8,
};

export default makeStyles(() => ({
  input: {
    height: 28,
    fontSize: 22,
    '&::-webkit-inner-spin-button,&::-webkit-outer-spin-button': {
      appearance: 'none',
      margin: 0,
    },
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
