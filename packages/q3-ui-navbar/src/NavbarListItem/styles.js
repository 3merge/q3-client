import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  button: {
    paddingRight: 16,
    width: '100%',
    zIndex: 1,
  },
  secondaryAction: {
    display: 'flex',
    fontSize: theme.typography.caption.fontSize,
  },
  icon: ({ state = false }) => ({
    color: 'inherit',
    transform: state ? 'rotate(-90deg)' : 'none',
    transition: 'transform 250ms',
  }),
}));
