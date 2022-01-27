import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  menu: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    height: '100%',
    width: 'calc(290px - 2.5rem)',
  },
  toolbar: {
    height: 65,
  },
  utilities: {
    display: 'flex',
    flex: 1,
    width: '100%',

    '& #q3-desktop-utilities': {
      width: '100%',
    },
  },
}));
