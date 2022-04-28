import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  link: {
    alignItems: 'center',
    display: 'flex',
    height: 95,
    maxHeight: 95,
    width: 'auto',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,

    [theme.breakpoints.down('lg')]: {
      alignItems: 'center',
      display: 'flex',
      maxWidth: '30vw',
    },

    [theme.breakpoints.down('md')]: {
      height: 65,
      maxHeight: 65,
      maxWidth: '35vw',
    },
  },
  img: ({ invertLogo }) => {
    const output = {
      maxHeight: '100%',
      maxWidth: '100%',
    };

    if (theme.palette.type === 'dark' && invertLogo)
      output.filter = 'invert(1) grayscale(100%)';

    return output;
  },
}));
