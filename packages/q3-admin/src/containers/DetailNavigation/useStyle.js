import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.background.default}`,
    paddingLeft: theme.spacing(1),

    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
    },
  },
}));
