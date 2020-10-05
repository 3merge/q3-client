import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    width: 210,

    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
