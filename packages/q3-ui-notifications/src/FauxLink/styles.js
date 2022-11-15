import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  link: {
    alignItems: 'center',
    display: 'flex',
    marginTop: theme.spacing(0.5),
    textDecoration: 'underline',

    '& svg': {
      marginRight: theme.spacing(0.5),
    },
  },
}));
