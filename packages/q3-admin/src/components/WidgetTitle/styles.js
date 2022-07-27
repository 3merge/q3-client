import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: 0,
    paddingLeft: theme.spacing(1.5),
    position: 'relative',

    '&::before': {
      backgroundColor: theme.palette.secondary.light,
      borderRadius: 4,
      content: '""',
      display: 'block',
      height: '100%',
      left: 0,
      position: 'absolute',
      width: '.75rem',
    },
  },
}));
