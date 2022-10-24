import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  adornment: {
    marginRight: `-${theme.spacing(1)}`,
  },
  icon: {
    color: red[500],
  },
  root: {
    borderRadius: 4,
    boxSizing: 'border-box',
    padding: `0 ${theme.spacing(1)}`,
    width: 425,
    maxWidth: '20vw',
    transition: 'box-shadow 250ms',
    backgroundColor: theme.palette.background.muted,
    height: 36.5,
    margin: 0,
    marginRight: theme.spacing(1),

    '&:focus-within': {
      'outline-style': 'auto',
      'outline-width': 'medium',
    },

    '& > *': {
      height: '100%',
    },

    '& input': {
      outline: '0 !important',
    },
  },
}));
