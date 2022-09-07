import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  chip: ({
    backgroundColor = theme.palette.secondary.main,
  }) => ({
    backgroundColor,
    color: theme.palette.secondary.contrastText,
  }),
}));
