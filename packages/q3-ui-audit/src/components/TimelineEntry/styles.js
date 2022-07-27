import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  table: {
    fontSize: '0.833rem',
    margin: 0,
    tableLayout: 'fixed',
    width: 'auto !important',
  },
  cellHead: {
    border: 0,
    fontWeight: 'bold',
    textAlign: 'left',
    verticalAlign: 'text-top',
    paddingLeft: 0,
  },
  cell: {
    border: 0,
    paddingLeft: 0,
  },
}));
