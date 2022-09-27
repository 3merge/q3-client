import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  secondaryAction: {
    display: 'flex',
    fontSize: theme.typography.caption.fontSize,
  },
  icon: ({ state = false }) => ({
    color: 'inherit',
    transform: state ? 'rotate(90deg)' : 'none',
    transition: 'color,transform 250ms !important',
  }),
}));
