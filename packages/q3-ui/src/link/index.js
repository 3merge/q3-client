import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

export default withStyles(() => ({
  root: {
    fontSize: '1rem',
    textDecoration: 'underline !important',
  },
}))(Link);
