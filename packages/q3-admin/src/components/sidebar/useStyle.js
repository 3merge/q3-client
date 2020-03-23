import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  columnWidth: ({ height }) => ({
    height,
    width: 435,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  }),
  root: {
    height: '100%',
    overflow: 'auto',

    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },

    '&::-webkit-scrollbar-thumb': {
      background: grey[300],
      borderRadius: '500px',
    },

    '&::-webkit-scrollbar-thumb:hover': {
      background: grey[500],
    },
  },
  item: {
    minWidth: 'auto',
  },
}));
