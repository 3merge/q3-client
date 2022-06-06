import { makeStyles } from '@material-ui/core';
import { breakdownColourPaletteBySeverity } from '../utils';

export default makeStyles((theme) => ({
  root: ({ severity }) => ({
    ...(severity
      ? breakdownColourPaletteBySeverity(severity)
      : {
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.secondary.dark,
        }),
    height: '3rem',
    width: '3rem',
  }),
}));
