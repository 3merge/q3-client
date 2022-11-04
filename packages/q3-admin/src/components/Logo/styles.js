import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  link: {
    alignItems: 'center',
    display: 'flex',
    height: 75,
    maxHeight: 75,
    width: 310,
    padding: theme.spacing(0.5),
    justifyContent: 'flex-start',

    [theme.breakpoints.down('lg')]: {
      alignItems: 'center',
      display: 'flex',
    },

    [theme.breakpoints.down('md')]: {
      width: 250,
    },

    [theme.breakpoints.down('sm')]: {
      width: 175,
    },

    [theme.breakpoints.down('xs')]: {
      width: 120,
    },
  },
  img: ({ invertLogo, padLogo }) => ({
    filter:
      invertLogo && theme.palette.type === 'dark'
        ? 'invert(1) grayscale(100%)'
        : undefined,
    objectFit: 'contain',
    objectPosition: 'left',
    padding: padLogo ? '.75rem' : undefined,
    height: '100%',
    width: '100%',

    [theme.breakpoints.down('md')]: {
      objectPosition: 'left',
    },
  }),
}));
