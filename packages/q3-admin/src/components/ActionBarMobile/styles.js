import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    borderTop: '1px solid var(--background-muted)',
    height: 65,
    padding: '0 1.5rem',
    position: 'relative',

    '& button': {
      minWidth: 'auto',
    },

    '& svg': {
      fontSize: '1rem !important',
      height: '1rem !important',
      width: '1rem !important',
    },
  },
}));
