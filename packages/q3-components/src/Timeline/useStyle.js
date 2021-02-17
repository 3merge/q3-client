import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  wrapper: {
    '&::before': {
      flex: 0,
    },
  },
  Create: {
    backgroundColor: 'green',
  },
  Delete: {
    backgroundColor: 'red',
  },
  Update: {
    backgroundColor: 'purple',
  },
  other: {
    backgroundColor: 'blue',
  },
}));
