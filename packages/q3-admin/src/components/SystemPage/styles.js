import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.background.muted}`,
    [theme.breakpoints.up('lg')]: {
      minHeight: 95,
    },
  },
  view: {
    [theme.breakpoints.up('lg')]: {
      height: 'calc(100% - 95px - 48px)',
    },

    height: 'calc(100% - 65px - 65px - 48px)',

    '& > div': {
      height: '100%',
    },
  },
}));
