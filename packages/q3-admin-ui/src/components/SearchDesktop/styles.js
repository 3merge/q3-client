import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    borderRadius: 4,
    boxSizing: 'border-box',
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    width: 550,
    maxWidth: '100%',
    transition: 'box-shadow 250ms',

    '&:focus-within': {
      'outline-style': 'auto',
      'outline-width': 'medium',
      boxShadow: theme.shadows[1],
      backgroundColor: theme.palette.background.paper,
    },

    '&:hover': {
      boxShadow: theme.shadows[1],
      backgroundColor: theme.palette.background.paper,
    },

    '& input': {
      outline: '0 !important',
    },
  },
}));
