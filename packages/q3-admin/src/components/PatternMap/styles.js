import { makeStyles, alpha } from '@material-ui/core';

export default makeStyles((theme) => ({
  heat: {
    display: 'block',
    borderRadius: 500,
    backgroundColor: alpha(
      theme.palette.secondary.light,
      0.55,
    ),
    width: '5rem',
    height: '5rem',
    border: `1px solid ${theme.palette.background.paper}`,
  },
}));
