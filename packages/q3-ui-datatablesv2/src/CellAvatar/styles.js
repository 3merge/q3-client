import { makeStyles, lighten } from '@material-ui/core';

export default makeStyles(() => ({
  root: ({ backgroundColor }) =>
    backgroundColor
      ? {
          backgroundColor,
          color: lighten(backgroundColor, 0.9),
        }
      : {},
}));
