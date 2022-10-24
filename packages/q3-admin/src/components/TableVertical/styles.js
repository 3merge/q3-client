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
      padding: '.5rem 1rem',
      whiteSpace: 'nowrap',
    },

    '& td': {
      whiteSpace: 'break-spaces',
      width: '100%',
    },

    '& th': {
      color: 'inherit',
      fontWeight: 'bold',
      minWidth: 0,
      width: 0,
    },
  },
}));
