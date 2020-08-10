import { makeStyles } from '@material-ui/core/styles';
import { grey, blue } from '@material-ui/core/colors';

const genGradient = (
  color = {},
) => `repeating-linear-gradient(
    -55deg,
      ${grey[200]},
      ${grey[200]} 2px,
      ${color[50]} 2px,
      ${color[50]} 5px
    )`;

export default makeStyles(() => ({
  root: {},
  isActive: {},
  container: {
    background: genGradient(grey),
    border: `1px solid ${grey[300]}`,
    borderRadius: 5,
    cursor: 'pointer',
    padding: '4vh',
    outline: 0,
    textAlign: 'center',

    '&:hover': {
      background: genGradient(blue),
      border: `1px solid ${blue[200]}`,
      color: blue[500],
    },

    '&:focus,&:focus-within': {
      background: genGradient(blue),
      border: `1px solid ${blue[300]}`,
      color: blue[900],
    },
  },
}));
