import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  preview: {
    opacity: 0,
    position: 'absolute',
    zIndex: 100,
    visibility: 'hidden',

    '&[data-dragging="true"]': {
      opacity: 1,
      visibility: 'visible',
    },
  },
}));
