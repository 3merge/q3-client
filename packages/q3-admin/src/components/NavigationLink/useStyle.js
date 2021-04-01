import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  menuItem: {
    alignItems: 'center',
    display: 'flex',
    marginRight: theme.spacing(1),
    padding: theme.spacing(0.5),
    textDecoration: 'none !important',
    color: 'inherit',
    height: '100%',
    borderBottom: '4px solid transparent',
    transitionProperty: 'color,border',
    transitionDuration: '250ms',
    position: 'relative',
    overflow: 'hidden',
    outline: 0,
    minWidth: 95,
    justifyContent: 'center',

    [theme.breakpoints.down('md')]: {
      '& > span': {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
      },
    },

    '& svg': {
      marginRight: theme.spacing(0.5),
    },
  },
  anchor: {
    cursor: 'initial',
  },
  active: {
    color: theme.palette.primary.contrastText,
  },
  parent: {
    color: 'inherit !important',
    borderBottom: `4px solid ${theme.palette.secondary.main}`,

    [theme.breakpoints.down('md')]: {
      color: `${theme.palette.secondary.main} !important`,
      border: 'none !important',
    },

    '& ~ ul a.current': {
      backgroundColor: theme.palette.secondary.main,
      width: '100%',
      borderRadius: 4,
      borderBottom: 0,
    },
  },
}));
