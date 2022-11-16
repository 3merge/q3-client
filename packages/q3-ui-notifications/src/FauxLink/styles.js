import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  link: {
    alignItems: 'center',
    display: 'flex',
    marginTop: theme.spacing(0.5),
    textDecoration: 'underline',
    maxWidth: 180,
    whiteSpace: 'nowrap',
    overflow: 'hidden',

    '& > span': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '100%',
    },

    '& svg': {
      marginRight: theme.spacing(0.5),
    },
  },
}));
