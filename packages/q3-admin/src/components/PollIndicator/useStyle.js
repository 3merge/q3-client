import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  dot: {
    borderRadius: 500,
    // color: theme.palette.primary.contrastText,
    fontSize: '1.5rem',
    marginRight: theme.spacing(0.5),
    padding: theme.spacing(0.25),
  },
  label: {
    backgroundColor: 'transparent',
    textTransform: 'initial !important',
    // color: theme.palette.primary.contrastText,
    fontSize: '0.812rem',
    fontWeight: 'strong',
    paddingLeft: '.5rem',
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto !important',
    },
  },
  root: {
    overflow: 'visible',
    marginTop: '1rem',

    '& small': {
      fontSize: '0.812rem',
    },

    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: -20,
      left: '50%',
      borderBottom: '10px solid #FFF',
      borderRight: '10px solid transparent',
      borderLeft: '10px solid transparent',
      borderTop: '10px solid transparent',
      transform: 'translateX(-50%)',
      zIndex: 10,
    },

    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  text: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
