import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    fontSize: '1rem !important',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '.5rem 0',
    position: 'sticky',
    top: 0,
    background: theme.palette.background.default,
    zIndex: 1,
  },
  item: {
    background: theme.palette.background.default,
    minWidth: 'auto',
    maxWidth: 'none',
    paddingLeft: 0,
    paddingRight: 0,
    '& svg': {
      fontSize: '1.232rem',
    },

    '&.Mui-selected': {
      color: theme.palette.secondary.main,
    },
  },
}));
