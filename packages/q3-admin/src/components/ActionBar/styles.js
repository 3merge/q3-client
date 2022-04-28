import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    diplay: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      top: -65,
      right: 0,
      left: 0,
      height: 65,
      justifyContent: 'center',
      zIndex: 5,
      overflowX: 'auto',
      backgroundColor: theme.palette.background.paper,
      borderTop: `1px solid ${theme.palette.background.default}`,
      borderBottom: `1px solid ${theme.palette.background.default}`,
      // boxShadow: 'rgb(0 0 0 / 8%) 0px -3px 18px 3px',
    },
  },
}));
