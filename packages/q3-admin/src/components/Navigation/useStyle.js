import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  muted: {},
  bar: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    height: 65,
    justifyContent: 'space-between',
    paddingRight: theme.spacing(2),
    color: theme.palette.primary.contrastText,
  },
  root: {
    display: 'flex',
    height: '100%',
    position: 'relative',
    zIndex: 100,
  },
  appbar: {},
  nav: {
    alignItems: 'center',
    listStyle: 'none',
    justifyContent: 'space-between',
    flexDirection: 'row',
    display: 'flex',
    padding: 0,
    height: '100%',
    margin: 0,

    [theme.breakpoints.down('md')]: {
      display: 'block',
      margin: 0,
      padding: 0,
    },

    '& > li > a.current': {
      borderBottom: `4px solid ${theme.palette.secondary.main}`,
    },

    '& li': {
      margin: 0,
      padding: 0,
      height: '100%',

      '& svg': {
        transition: 'transform 150ms ease-in',
        transform: 'rotate(0)',
      },

      '& a.selected': {
        '& svg': {
          transform: 'rotate(180deg)',
        },
        '& ~ ul': {
          [theme.breakpoints.down('md')]: {
            display: 'block !important',
            opacity: 1,
            padding: '0 1rem',
            transform: 'translateY(0)',
            visibility: 'visible',
          },
        },
      },
    },

    '& li > ul': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: theme.shadows[4],
      listStyle: 'none',
      margin: 0,
      opacity: 0,
      padding: theme.spacing(2),
      transform: 'translateY(-20px)',
      transitionDuration: '350ms',
      transitionProperty: 'opacity,transform,visibility',
      visibility: 'hidden',

      [theme.breakpoints.down('md')]: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: 'none',
        display: 'none',
        position: 'relative',
        opactity: 1,
        visibility: 'visible',
        transform: 'none',
        marginTop: theme.spacing(1),
      },
    },

    '& li:focus-within': {
      '& svg': {
        [theme.breakpoints.up('md')]: {
          transform: 'rotate(180deg)',
        },
      },
      '& > ul': {
        [theme.breakpoints.up('md')]: {
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        },
      },
    },
  },
  actions: {},
  logo: {
    alignItems: 'center',
    display: 'flex',
    fill: theme.palette.primary.contrastText,
    height: '100%',
    width: 'calc(58px + 2rem)',
    justifyContent: 'center',

    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-start',
    },
  },
  avatar: {
    height: 58,
    width: 58,

    '& img': {
      objectFit: 'contain',
    },
  },
  menuItem: {
    alignItems: 'center',
    display: 'flex',
    padding: theme.spacing(0.5),
    textDecoration: 'none !important',

    '& svg': {
      marginRight: theme.spacing(0.75),
    },
  },
}));
