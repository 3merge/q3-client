import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  icon: ({ color }) => ({
    color,
    height: '100%',
    objectFit: 'contain',
    transform: 'scale(.25)',
    transformOrigin: 'center',
    width: '100%',
  }),
}));
