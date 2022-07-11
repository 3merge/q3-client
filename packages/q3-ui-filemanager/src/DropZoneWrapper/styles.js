import { makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

export default makeStyles(() => ({
  root: ({ isDragActive }) => ({
    border: '2px solid',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: -1,

    ...(isDragActive
      ? {
          borderColor: blue[500],
        }
      : {
          borderColor: 'transparent',
        }),
  }),
}));
