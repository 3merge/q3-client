import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  nowrap: {
    whiteSpace: 'nowrap',
  },
  padding: {
    padding: 4,
  },
  listItem: {
    padding: 0,
    margin: 0,
  },
  body: {
    '& tr:nth-child(even)': {
      backgroundColor: theme.palette.background.default,
    },
    '& tr:nth-child(odd)': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));
