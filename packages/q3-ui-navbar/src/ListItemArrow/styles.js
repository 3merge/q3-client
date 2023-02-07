import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  secondaryAction: {
    display: 'flex',
    fontSize: theme.typography.caption.fontSize,
    position: 'relative',
    right: 'auto',
    top: '0',
    transform: 'none',
    marginLeft: theme.spacing(0.5),
  },
  icon: ({ state = false }) => ({
    color: 'inherit',
    transform: state ? 'rotate(90deg)' : 'none',
    transition: 'color,transform 250ms !important',
  }),
}));
