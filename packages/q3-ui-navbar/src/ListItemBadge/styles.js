import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  badge: {
    borderRadius: 500,
    display: 'inline-block',
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    fontSize: theme.typography.caption.fontSize,
    width: '1rem',
    height: '1rem',
    textAlign: 'center',
    fontWeight: 'bold',
  },
}));
