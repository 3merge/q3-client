import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  link: {
    alignItems: 'center',
    display: 'flex',
    height: 75,
    maxHeight: 75,
    width: 245,
    justifyContent: 'center',
    padding: theme.spacing(0.5),

    [theme.breakpoints.down('lg')]: {
      alignItems: 'center',
      display: 'flex',
    },

    [theme.breakpoints.down('md')]: {
      height: 65,
      maxHeight: 65,
      justifyContent: 'flex-start',
      width: 250,
    },
  },
  img: ({ invertLogo, padLogo }) => ({
    filter:
      invertLogo && theme.palette.type === 'dark'
        ? 'invert(1) grayscale(100%)'
        : undefined,
    objectFit: 'contain',
    objectPosition: 'center',
    padding: padLogo ? '.75rem' : undefined,
    height: '100%',
    width: '100%',

    [theme.breakpoints.down('md')]: {
      objectPosition: 'left',
    },
  }),
}));
