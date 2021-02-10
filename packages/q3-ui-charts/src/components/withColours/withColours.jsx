import React from 'react';
import ColorScheme from 'color-scheme';
import { useTheme } from '@material-ui/core/styles';

export const isNotPureWhite = (colour) =>
  String(colour).toLowerCase() !== 'ffffff';

export const hexify = (colour) =>
  colour ? `#${colour}` : '#000';

export const useThemeColourPalette = () =>
  new ColorScheme()
    .from_hex(
      String(useTheme()?.palette?.secondary?.main).replace(
        '#',
        '',
      ),
    )
    .scheme('triade')
    .distance(0.1)
    .variation('pastel')
    .web_safe(true)
    .colors()
    .filter(isNotPureWhite)
    .map(hexify);

export default (Component) => {
  const Chart = (props) => (
    <Component
      {...props}
      colours={useThemeColourPalette()}
    />
  );

  Chart.defaultProps = {};
  Chart.propTypes = {};

  return Chart;
};
