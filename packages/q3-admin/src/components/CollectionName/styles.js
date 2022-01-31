import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  seg: {
    marginLeft: '.5rem',
    '&:empty': {
      display: 'none',
    },

    '&::before': {
      content: '"/"',
      paddingRight: '.5rem',
    },
  },
}));
