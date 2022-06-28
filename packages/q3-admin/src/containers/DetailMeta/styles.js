import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  primary: {
    fontSize: '0.812rem',
    whiteSpace: 'nowrap',
  },
  meta: {
    borderTop: `1px solid ${theme.palette.background.muted}`,
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(1),
  },
}));
