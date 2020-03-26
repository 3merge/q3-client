import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

export default withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(15),
    padding: theme.spacing(1),
  },
  arrow: {
    color: theme.palette.secondary.main,
  },
}))(Tooltip);
