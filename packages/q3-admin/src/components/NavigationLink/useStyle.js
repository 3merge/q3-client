import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  menuItem: {
    alignItems: 'center',
    display: 'flex',
    padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
    textDecoration: 'none !important',
    color: 'inherit',
    height: '100%',
    borderBottom: '2px solid transparent',
    transitionProperty: 'color,border',
    transitionDuration: '250ms',
    position: 'relative',
    overflow: 'hidden',
    outline: 0,
    whiteSpace: 'nowrap',
    fontSize: '0.933rem',
    fontWeight: 'bold',

    '&:hover': {
      color: theme.palette.secondary.light,
    },

    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
      whiteSpace: 'inherit',
      fontWeight: 'inherit',

      '& > span': {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
      },
    },

    '& svg': {
      margin: `0 ${theme.spacing(0.5)}`,
    },
  },
  anchor: {
    cursor: 'initial',
  },
  active: {
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('md')]: {
      color: `${theme.palette.secondary.main} !important`,
      border: 'none !important',
    },
  },
  parent: {
    color: 'inherit !important',
    borderBottom: `2px solid ${theme.palette.secondary.main}`,

    [theme.breakpoints.down('md')]: {
      color: `${theme.palette.secondary.main} !important`,
      border: 'none !important',
    },

    '& ~ ul a.current': {
      fontStyle: 'bold',
      color: theme.palette.secondary.light,
      width: '100%',
      borderBottom: 0,
    },
  },
}));
