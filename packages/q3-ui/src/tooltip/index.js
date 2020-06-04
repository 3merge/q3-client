import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

export default withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.secondary.main,
    fontSize: '0.75rem',
    padding: theme.spacing(0.35),
  },
  arrow: {
    color: theme.palette.secondary.main,
  },
}))(Tooltip);
