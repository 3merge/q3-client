import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette: { grey } }) => ({
  border: {
    '& section': {
      borderLeft: `2px solid ${grey[100]} !important`,
    },
  },
}));
