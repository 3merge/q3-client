import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  title: {
    alignItems: 'center',
    display: 'flex',

    '& svg': {
      marginRight: theme.spacing(1),
    },
  },
}));
