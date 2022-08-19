import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    boxShadow: theme.shadows[1],
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: 65,
    padding: `0 ${theme.spacing(1)}`,
    width: '100%',
    zIndex: 0,
  },
}));
