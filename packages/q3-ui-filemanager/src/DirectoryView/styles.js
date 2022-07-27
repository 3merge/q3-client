import { withStyles } from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export const StyledToggleButtonGroup = withStyles(
  (theme) => ({
    root: {
      marginRight: theme.spacing(1),
    },
    grouped: {
      color: 'inherit',
      // margin: theme.spacing(0.5),
      border: 'none',
      '&:not(:first-child)': {
        borderRadius: theme.shape.borderRadius,
        //   borderTopRightRadius: 16,
        // borderBottomRightRadius: 16,
      },
      '&:first-child': {
        borderRadius: theme.shape.borderRadius,
        // borderTopLeftRadius: 16,
        // borderBottomLeftRadius: 16,
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
      },
    },
  }),
)(ToggleButtonGroup);
