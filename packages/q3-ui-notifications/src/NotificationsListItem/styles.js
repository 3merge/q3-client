import {
  makeStyles,
  lighten,
  darken,
} from '@material-ui/core';

export default makeStyles((theme) => {
  const getBackgroundColor =
    theme.palette.type === 'light' ? lighten : darken;

  return {
    listItem: ({ archived = false, read = false }) => {
      let backgroundColor;

      if (!read)
        backgroundColor = theme.palette.background.default;

      if (archived)
        backgroundColor = getBackgroundColor(
          theme.palette.error.main,
          0.9,
        );

      return {
        backgroundColor,
      };
    },
  };
});
