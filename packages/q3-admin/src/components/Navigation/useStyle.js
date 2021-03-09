import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  muted: {},
  bar: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    height: 71,
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
            padding: '0 1.5rem',
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
    display: 'block',
    fill: theme.palette.primary.contrastText,
    height: '100%',
    minWidth: 245,
    maxWidth: 345,

    '& img': {
      height: '100%',
      objectPosition: 'center !important',
      objectFit: 'contain !important',
      width: '100%',

      [theme.breakpoints.down('md')]: {
        objectPosition: 'left !important',
      },
    },

    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
      width: 195,
    },

    [theme.breakpoints.down('xs')]: {
      width: 145,
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
