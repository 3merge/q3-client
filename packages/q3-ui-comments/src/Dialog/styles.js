import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    '& .q3-forms-rte-wrapper': {
      overflow: 'initial !important',
    },

    '& .cancel': {
      display: 'none !important',
    },
  },
}));
