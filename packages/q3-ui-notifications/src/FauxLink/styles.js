import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  link: {
    alignItems: 'center',
    display: 'flex',
    marginTop: theme.spacing(0.5),
    textDecoration: 'underline',
    maxWidth: 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',

    [theme.breakpoints.down('md')]: {
      width: 230,
    },

    [theme.breakpoints.down('sm')]: {
      width: 180,
    },

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
