import { alpha, makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

export default makeStyles(() => ({
  root: ({ isDragActive }) => ({
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,

    ...(isDragActive
      ? {
          zIndex: 100,
        }
      : {
          zIndex: undefined,
        }),
  }),
  overlay: ({ isDragActive }) => ({
    border: `1px solid ${blue[500]}`,
    backgroundColor: alpha(blue[500], 0.15),
    display: isDragActive ? 'block' : 'none',
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  }),
}));
