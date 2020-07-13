import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    position: 'sticky',
    bottom: 0,
    height: 20,
    overflowX: 'auto',
    overflowY: 'hidden',
    width: '100%',
    zIndex: 100,
  },
  snap: {
    height: 20,
  },
  headerCell: {
    width: 325,
    minWidth: 325,
    position: 'sticky',
    left: 0,
  },
  fixedCell: ({ width }) => ({
    minWidth: width,
    width,
  }),
}));
