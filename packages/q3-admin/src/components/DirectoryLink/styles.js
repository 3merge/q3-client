import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  logo: {
    display: 'block',
    fill: theme.palette.primary.contrastText,
    height: '100%',
    minWidth: 245,
    maxWidth: 345,

    '& > div, & img': {
      height: '100%',
      width: '100%',
    },

    '& img': {
      objectPosition: 'center !important',
      objectFit: 'contain !important',

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
}));
