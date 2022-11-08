import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    boxShadow: theme.shadows[2],
    position: 'relative',
    zIndex: 11,
    height: 75,
    padding: `${theme.spacing(0.25)} ${theme.spacing(2)}`,
    borderBottom: `1px solid ${theme.palette.background.muted}`,
    display: 'flex',
    alignItems: 'center',
    width: '100%',

    [theme.breakpoints.down('md')]: {
      zIndex: 1,
      padding: `${theme.spacing(0.25)} ${theme.spacing(1)}`,
      borderBottom: 'none',

      '& > div > div > div > button': {
        background: 'transparent',
      },
    },
  },
  back: {
    '& > :not(:only-child):first-child': {
      display: 'none',
    },

    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  actions: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',

    '& div:empty': {
      display: 'none',
    },

    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      bottom: 0,
      position: 'fixed',
      left: 0,
      right: 0,
      padding: 0,
      height: 75,
      boxShadow: theme.shadows[2],

      '& [aria-current="page"], & [data-state="active"]': {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
      },
    },
  },
  actionsTop: {
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
}));
