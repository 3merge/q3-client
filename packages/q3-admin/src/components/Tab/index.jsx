import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core';

export default withStyles((theme) => ({
  textColorInherit: {
    fontWeight: 'bold',
    minHeight: 'auto',
    minWidth: 'auto',
    opacity: 0.5,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
}))(Tab);
