import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: ({ transparent }) => ({
    backgroundColor: transparent
      ? 'transparent'
      : undefined,
  }),
  graphic: {
    '& svg, & img': {
      display: 'block',
      margin: '0 auto 4rem',
      maxWidth: '100%',
      paddingTop: 0,
      height: 255,
      width: 350,
      [theme.breakpoints.down('sm')]: {
        height: 'auto',
      },
    },
  },
}));
