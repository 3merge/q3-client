import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  nav: {
    backgroundColor: theme.palette.background.paper,
    height: 'calc(100 * var(--vh))',
    position: 'relative',
    width: 290,
    zIndex: 10,

    '& > div > a': {
      maxHeight: 80,
      marginBottom: theme.spacing(3),
    },
  },
  appbar: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: 65,
    justifyContent: 'space-between',
    padding: `0 ${theme.spacing(1.5)}`,
    width: '100%',
  },
  paper: {
    borderRadius: 0,
    overflowX: 'auto',
    padding: theme.spacing(1),
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  // footer: {
  //   boxShadow: theme.shadows[0],
  //   backgroundColor: theme.palette.background.paper,
  //   borderTop: `1px solid ${theme.palette.background.muted}`,
  //   bottom: 0,
  //   left: 0,
  //   position: 'absolute',
  //   right: 0,

  //   '& > div': {
  //     alignItems: 'center',
  //     flexDirection: 'row-reverse',
  //     height: 65,
  //     padding: `0 ${theme.spacing(1)}`,

  //     '& div:last-of-type': {
  //       flex: 1,
  //     },
  //   },
  // },
}));
