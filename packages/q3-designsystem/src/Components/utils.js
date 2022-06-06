import * as colors from '@material-ui/core/colors';

export const breakdownColourPaletteByNamespace = (
  colorNamespace,
) =>
  colorNamespace in colors
    ? {
        background: colors[colorNamespace]['50'],
        color: colors[colorNamespace]['900'],
      }
    : {};

export const breakdownColourPaletteBySeverity = (
  severity,
) =>
  breakdownColourPaletteByNamespace(
    [
      'grey',
      'red',
      'orange',
      'yellow',
      'lightBlue',
      'blue',
      'lightGreen',
      'green',
    ][severity] || 'grey',
  );
