import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  icon: () => ({
    display: 'inline-block',
    height: theme.typography.h2.fontSize,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: theme.typography.h6.fontSize,
  }),
  title: {
    margin: 0,
    padding: 0,
    marginLeft: theme.spacing(1),
  },
  toolbar: {
    display: 'flex',
    height: '64px !important',
    justifyContent: 'space-between',
    width: '100%',
  },
}));
