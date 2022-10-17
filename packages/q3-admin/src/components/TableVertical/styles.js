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
      padding: 8,
    },

    '& td': {
      whiteSpace: 'break-spaces',
      width: '100%',
    },

    '& th': {
      backgroundColor: theme.palette.background.muted,
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      minWidth: 0,
      width: 0,
    },
  },
}));
