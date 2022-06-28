import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  link: {
    alignItems: 'center',
    display: 'flex',
    height: 75,
    maxHeight: 75,
    width: 'auto',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    justifyContent: 'center',

    [theme.breakpoints.down('lg')]: {
      alignItems: 'center',
      display: 'flex',
      maxWidth: '30vw',
    },

    [theme.breakpoints.down('md')]: {
      height: 65,
      maxHeight: 65,
      maxWidth: '30vw',
      padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
      justifyContent: 'flex-start',
    },
  },
  img: ({ invertLogo }) => ({
    filter:
      invertLogo && theme.palette.type === 'dark'
        ? 'invert(1) grayscale(100%)'
        : undefined,
    maxHeight: '100%',
    maxWidth: '100%',
  }),
}));
