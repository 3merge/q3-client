import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  wrapper: {
    minHeight: '0 !important',
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
  date: {
    fontSize: '0.833rem',
    width: 95,
    whiteSpace: 'break-spaces',
  },
  initial: {
    flex: 'initial',
  },
}));
