import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  box: {
    overflow: 'scroll',
    maxWidth: '100%',
  },
  table: {
    tableLayout: 'auto',
    width: '100%',

    '& tr:nth-child(odd)': {
      backgroundColor: theme.palette.background.default,
    },

    '& td,& th': {
      borderBottom: 'none',
      padding: 6,
      whiteSpace: 'nowrap',
    },

    '& td': {
      width: '100%',
    },

    '& th': {
      color: theme.palette.secondary.dark,
      fontWeight: 'bold',
      minWidth: 0,
      width: 0,
      paddingRight: 12,
    },
  },
}));
